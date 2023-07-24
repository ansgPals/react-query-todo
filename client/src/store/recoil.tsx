import { atom } from "recoil";

export const defaultToast = { isOpen: false, type: "", text: "" };

export const toastRecoilState = atom<{
  isOpen: boolean;
  type?: string;
  text: string;
}>({
  key: "toastState",
  default: defaultToast,
});

export const isLoginRecoilState = atom<boolean>({
  key: "authState",
  default: false,
});
