import * as yup from 'yup'

export const emailPasswordSchema = yup.object({
  email: yup
    .string()
    .email('이메일 형식이 적합하지 않습니다.')
    .required('이메일은 필수 입력 사항입니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수입력사합니다.')
    .min(8, '비밀번호는 최소 8자리 이상 입력해주세요')
    .max(15, '비밀번호는 최대 15자리로 입력해주세요'),
})
