import { keyframes } from '@emotion/react'

export const slideUpAnimation = keyframes`
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
`
export const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-5px);
  }
  20% {
    transform: translateX(0px);
  }
  30% {
    transform: translateX(5px);
  }40% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-5px);
  }
  60% {
    transform: translateX(0px);
  }
  70% {
    transform: translateX(5px);
  }
  80% {
    transform: translateX(0px);
  }
  90% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`
