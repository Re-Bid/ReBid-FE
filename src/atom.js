import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const nowNav = atom({
  key: "navState",
  default: "",
});

export const bidPriceState = atom({
  key: "bidPriceState",
  default: 0
})