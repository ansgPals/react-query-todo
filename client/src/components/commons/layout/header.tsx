import { TOKEN } from "@/constants/common";
import { isLoginRecoilState } from "@/store/recoil";
import styled from "@emotion/styled";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function LayoutHeader() {
  const router = useRouter();
  const [isLogin, handleIsLogin] = useState(false);
  const [, handleRecoilLoginState] = useRecoilState(isLoginRecoilState);
  const onClickButton = (page: string) => () => {
    router.push(`${page}`);
  };
  const token = Cookies.get(TOKEN);

  useEffect(() => {
    !!token ? handleIsLogin(true) : handleIsLogin(false);
  });

  useEffect(() => {
    handleRecoilLoginState(isLogin);
  }, [isLogin]);

  return (
    <Wrapper>
      <p>TODO</p>
      <div>
        {isLogin ? (
          <button onClick={onClickButton("/logout")}>로그아웃</button>
        ) : (
          <button onClick={onClickButton("/login")}>로그인</button>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #161725;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid orange;
  align-items: center;
  > div {
    display: flex;
    justify-content: space-between;
    max-width: 150px;
    margin: 0 50px;

    > a,
    button {
      min-width: fit-content;
      font-size: 16px;
      color: #e9ab41;
      text-align: center;
      margin: 0 15px 0 0;
      cursor: pointer;
      background-color: unset;
      border: unset;
    }
  }
`;
