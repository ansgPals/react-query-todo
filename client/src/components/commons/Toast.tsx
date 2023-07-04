import { shakeAnimation, slideUpAnimation } from "@/styles/animation";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default function Toast(props: {
  toastValue: { isOpen: boolean; type?: string; text: string };
}) {
  const { isOpen, type, text } = props.toastValue;
  return isOpen ? <ToastComponent type={type}>{text}</ToastComponent> : <></>;
}

const ToastComponent = styled.div<{ type?: string }>`
  padding: 15px;
  min-width: 280px;
  top: 45%;
  border: 2px solid ${(props) => (props.type === "error" ? "red" : "orange")};
  background-color: ${(props) =>
    props.type === "error"
      ? "rgba(255, 185, 129,0.9)"
      : "rgba(213, 206, 255,0.9)"};
  font-weight: 700;
  z-index: 100;
  text-align: center;
  border-radius: 10px;
  position: absolute;

  ${(props) =>
    props.type === "error"
      ? css`
          animation: ${shakeAnimation} 0.7s ease-in-out;
        `
      : css`
          animation: ${slideUpAnimation} 0.5s ease-in-out forwards;
        `}
`;
