import React, { useEffect, useRef } from 'react';

const NaverPayButton = () => {
    const naverPayBtnRef = useRef(null);

    useEffect(() => {
        const loadNaverPayScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const initializeNaverPay = async () => {
            try {
                await loadNaverPayScript();
                const oPay = window.Naver.Pay.create({
                    mode: "production", // or "development"
                    clientId: "HN3GGCMDdTgGUfl0kFCo",
                    chainId: "R0pVajNjak50Uyt"
                });

                naverPayBtnRef.current.addEventListener("click", () => {
                    oPay.open({
                        merchantPayKey: "np_fnluq080411",
                        productName: "조주희",
                        totalPayAmount: "20000",
                        taxScopeAmount: "1000",
                        taxExScopeAmount: "0",
                        returnUrl: "사용자 결제 완료 후 결제 결과를 받을 URL"
                    });
                });
            } catch (error) {
                console.log(error)
            }
        };

        initializeNaverPay();
    }, []);

    return (
        <label htmlFor="naverPayBtn" className="w-full btn bg-green-400 hover:bg-green-400">
            <input
                type="button"
                id="naverPayBtn"
                value="네이버페이 결제 버튼"
                ref={naverPayBtnRef}

            />
        </label>

    );
};

export default NaverPayButton;
