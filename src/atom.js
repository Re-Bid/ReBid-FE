import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const nowNav = atom({
  key: "navState",
  default: "all",
});

export const bidPriceState = atom({
  key: "bidPriceState",
  default: 0,
});

export const adminState = atom({
  key: "adminState",
  default: false,
});
