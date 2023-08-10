import styled from "@emotion/styled";
import Link from "next/link";

export default function NotFound() {
  return (
    <StyledNotFound>
      <p>없는 페이지입니다..</p>
      <p>🙀젭왈 의도한데로만 움직이셈요🙀</p>
      <Link href="/" legacyBehavior>
        <a>메인페이지로 돌아가기👈</a>
      </Link>
    </StyledNotFound>
  );
}

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: white;
    font-size: 30px;
    margin-top: 20px;
  }
  a {
    color: white;
    font-size: 25px;
    margin-top: 40px;
    :hover {
      color: orange;
    }
  }
`;
