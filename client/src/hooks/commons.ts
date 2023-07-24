import { toastRecoilState } from '@/store/recoil'
import { useRecoilState } from 'recoil'

export const useToast = () => {
  const [, setToastState] = useRecoilState(toastRecoilState)
  const handleToast = (message: string, type?: string) => {
    setToastState({
      isOpen: true,
      type: type,
      text: message,
    })
  }
  return { handleToast }
}
