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

export type ColorMode = "dark" | "purple" | "point_dark" | "light";

export const colorModeRecoilState = atom<{ colorMode: ColorMode }>({
  key: "colorModeState",
  default: { colorMode: "dark" },
});
