import { colorModeRecoilState } from "@/store/recoil";
import theme from "@/styles/theme";
import { useRecoilState } from "recoil";

export const useTheme = () => {
  const [colorModeState] = useRecoilState(colorModeRecoilState);

  const colors = theme.colors[colorModeState.colorMode];

  const customTheme = {
    colors,
  };

  return customTheme;
};
