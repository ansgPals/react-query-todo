import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import LayoutHeader from "./header";
import { useRecoilState } from "recoil";
import { defaultToast, toastRecoilState } from "@/store/recoil";
import Toast from "../Toast";

export default function Layout(props: { children: ReactNode }) {
  const router = useRouter();
  const isLogin = router.asPath === "/login" || router.asPath === "/sign-up";
  const isMainPage = router.asPath === "/";
  const [toastValue, handleToastState] = useRecoilState(toastRecoilState);
  useEffect(() => {
    setTimeout(() => handleToastState(defaultToast), 800);
  }, [toastValue]);
  return (
    <>
      {!isMainPage && <LayoutHeader />}
      <Body isMainPage={isMainPage}>
        {props.children} <Toast toastValue={toastValue} />
      </Body>
    </>
  );
}

const Body = styled.div<{ isMainPage: boolean }>`
  width: 100vw;
  min-height: calc(100vh - ${(props) => (props.isMainPage ? "0" : "60px")});
  display: flex;
  justify-content: center;
  background-color: #161725;
`;
