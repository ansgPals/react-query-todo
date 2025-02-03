import { isLoginRecoilState, toastRecoilState } from '@/store/recoil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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

export const useAuth = () => {
  const router = useRouter()
  const { handleToast } = useToast()
  const [recoilLoginState] = useRecoilState(isLoginRecoilState)

  useEffect(() => {
    if (!recoilLoginState) {
      handleToast('로그인 후 사용 가능합니다.')
      router.push('/login')
    }
  }, [])
}
