import { css } from "@emotion/react";

import emotionReset from "emotion-reset";

import { CustomThemeType } from "@/styles/theme";

export const globalStyles = (props: CustomThemeType) => css`
  ${emotionReset};
  * {
    margin: 0;
    box-sizing: border-box;
    font-size: 10px;
    color: #161725;

    @media (max-width: 1250px) {
      font-size: 9px;
    }
    @media (max-width: 992px) {
      font-size: 7px;
    }
  }
`;
export default globalStyles;
