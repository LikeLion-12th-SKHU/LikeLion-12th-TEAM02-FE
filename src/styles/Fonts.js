// Fonts.js

import { css } from "styled-components";

import Baloo2Bold from "../fonts/Baloo2-Bold.woff";
import Baloo2ExtraBold from "../fonts/Baloo2-ExtraBold.woff";
import Baloo2Medium from "../fonts/Baloo2-Medium.woff";
import Baloo2Regular from "../fonts/Baloo2-Regular.woff";
import Baloo2SemiBold from "../fonts/Baloo2-SemiBold.woff";
import PretendardBlack from "../fonts/Pretendard-Black.woff";
import PretendardBold from "../fonts/Pretendard-Bold.woff";
import PretendardExtraBold from "../fonts/Pretendard-ExtraBold.woff";
import PretendardExtraLight from "../fonts/Pretendard-ExtraLight.woff";
import PretendardLight from "../fonts/Pretendard-Light.woff";
import PretendardMedium from "../fonts/Pretendard-Medium.woff";
import PretendardRegular from "../fonts/Pretendard-Regular.woff";
import PretendardSemiBold from "../fonts/Pretendard-SemiBold.woff";
import PretendardThin from "../fonts/Pretendard-Thin.woff";

export const Fonts = css`
  @font-face {
    font-family: "Baloo 2";
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
    src:
      local("Baloo2"),
      url(${Baloo2ExtraBold}) format("woff");
  }

  @font-face {
    font-family: "Baloo 2";
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    src:
      local("Baloo2"),
      url(${Baloo2Bold}) format("woff");
  }

  @font-face {
    font-family: "Baloo 2";
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    src:
      local("Baloo2"),
      url(${Baloo2SemiBold}) format("woff");
  }

  @font-face {
    font-family: "Baloo 2";
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    src:
      local("Baloo2"),
      url(${Baloo2Medium}) format("woff");
  }

  @font-face {
    font-family: "Baloo 2";
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    src:
      local("Baloo2"),
      url(${Baloo2Regular}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 900;
    font-display: swap;
    src:
      local("Pretendard Black"),
      url(${PretendardBlack}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 800;
    font-display: swap;
    src:
      local("Pretendard ExtraBold"),
      url(${PretendardExtraBold}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    font-display: swap;
    src:
      local("Pretendard Bold"),
      url(${PretendardBold}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 600;
    font-display: swap;
    src:
      local("Pretendard SemiBold"),
      url(${PretendardSemiBold}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    font-display: swap;
    src:
      local("Pretendard Medium"),
      url(${PretendardMedium}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    font-display: swap;
    src:
      local("Pretendard Regular"),
      url(${PretendardRegular}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 300;
    font-display: swap;
    src:
      local("Pretendard Light"),
      url(${PretendardLight}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 200;
    font-display: swap;
    src:
      local("Pretendard ExtraLight"),
      url(${PretendardExtraLight}) format("woff");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 100;
    font-display: swap;
    src:
      local("Pretendard Thin"),
      url(${PretendardThin}) format("woff");
  }
`;
