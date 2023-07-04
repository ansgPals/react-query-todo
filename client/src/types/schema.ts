import * as yup from 'yup'

export const loginSchema = yup.object({
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

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('이메일 형식이 적합하지 않습니다.')
    .required('이메일은 필수 입력 사항입니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수입력사합니다.')
    .min(8, '비밀번호는 최소 8자리 이상 입력해주세요')
    .max(15, '비밀번호는 최대 15자리로 입력해주세요'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다')
    .required('비밀번호를 한번 더 입력해주세요'),
})
export const createSchema = yup.object({
  title: yup.string().required('할일은 필수 입력 사항입니다.'),
  content: yup.string().required('내용은 필수입력사합니다.'),
})
