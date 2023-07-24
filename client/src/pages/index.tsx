import { LOGIN_URL } from "@/constants/url";
import todoLottie from "@/styles/todo_lottie.json";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: todoLottie,
};

export default function Home() {
  const router = useRouter();
  return (
    <StyledMainPage>
      <StyledLogo>TODO</StyledLogo>
      <StyledButtonWrapper>
        <button onClick={() => router.push(LOGIN_URL)}>START</button>
      </StyledButtonWrapper>
      <Lottie options={lottieOptions} />
    </StyledMainPage>
  );
}

const StyledMainPage = styled.div`
  background-color: #161725;
  max-width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const StyledLogo = styled.div`
  letter-spacing: 1.3px;
  font-weight: 900;
  color: #ff32e0;
  font-size: 130px;
  -webkit-text-stroke: 3px white;
  position: absolute;
  z-index: 50;
  top: 30%;
  left: calc(50% - 180px);
`;

const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 52%;
  left: calc(50% - 200px);
  z-index: 50;

  button {
    background-color: orange;
    font-size: 18px;
    font-weight: 700;
    color: white;
    width: 400px;
    height: 70px;
    border: unset;
    border-radius: 15px;
    cursor: pointer;

    :hover {
      border: 2px solid white;
    }
  }
`;
