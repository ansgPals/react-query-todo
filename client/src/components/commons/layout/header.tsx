import { TOKEN } from "@/constants/common";
import {isLoginRecoilState, ColorMode, colorModeRecoilState } from "@/store/recoil";

import styled from "@emotion/styled";
import Cookies from "js-cookie";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function LayoutHeader() {
  const router = useRouter();
  const [isLogin, handleIsLogin] = useState(false);
  const [isColorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [colorModeState, setColorMode] = useRecoilState(colorModeRecoilState);
  const [, handleRecoilLoginState] = useRecoilState(isLoginRecoilState);

  const onClickButton = (page: string) => () => {
    router.push(`${page}`);
  };
  const token = Cookies.get(TOKEN);

  const handleColorPaletteOpen = () => {
    setColorPaletteOpen((prev) => !prev);
  };

  const colorModeList: ColorMode[] = ["dark", "purple", "point_dark", "light"];

  const handleColorMode = (colorMode: ColorMode) => () => {
    setColorMode({ colorMode });
    setColorPaletteOpen(false);
  };

  useEffect(() => {
    !!token ? handleIsLogin(true) : handleIsLogin(false);
  });

  useEffect(() => {
    handleRecoilLoginState(isLogin);
  }, [isLogin]);

  return (
    <Wrapper>
      <div>
        <div>
          {isColorPaletteOpen &&
            _.map(colorModeList, (item: ColorMode) => (
              <StyledColorModeItem
                key={item}
                onClick={handleColorMode(item)}
                isSelected={item === colorModeState.colorMode}
              >
                {item}
              </StyledColorModeItem>
            ))}
          <p onClick={handleColorPaletteOpen}>COLOR MODE</p>
        </div>
        {isLogin ? (
          <button onClick={onClickButton("/logout")}>로그아웃</button>
        ) : (
          <button onClick={onClickButton("/login")}>로그인</button>
        )}
      </div>
    </Wrapper>
  );
}
const StyledColorModeItem = styled.p<{ isSelected: boolean }>`
  color: ${(props) => props.theme.colors.main_point_color};
  padding: 5px 20px;
  font-weight: ${(props) => (props.isSelected ? "800" : "400")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "unset")};
  font-size: ${(props) => (props.isSelected ? "18px" : "15px")};
  cursor: pointer;
`;
const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: ${(props) => props.theme.colors.main_bg};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.main_point_color};
  align-items: center;

  > div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 0 50px;

    > a,
    button {
      min-width: fit-content;
      font-size: 16px;
      color: ${(props) => props.theme.colors.main_point_color};
      text-align: center;
      margin: 0 15px 0 0;
      cursor: pointer;
      background-color: unset;
      border: unset;
    }

    > div {
      border: 1px solid ${(props) => props.theme.colors.main_point_color};
      padding: 10px 20px;
      margin: 0 50px;
      display: flex;
      cursor: pointer;
      > p:last-of-type {
        color: ${(props) => props.theme.colors.main_point_color};
        padding: 5px 20px;
      }
    }
  }
`;
