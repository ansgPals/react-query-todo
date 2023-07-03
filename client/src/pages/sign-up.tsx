import { useReactQueryPost } from "@/api/http";
import { SIGN_UP_API_URL } from "@/constants/endpoint";
import { LOGIN_URL } from "@/constants/url";
import { IFormValues } from "@/types";
import { emailPasswordSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(emailPasswordSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const { mutation } = useReactQueryPost({ url: SIGN_UP_API_URL });

  const onClickSubmit = (data: IFormValues) => {
    const { email, password } = data;

    mutation(
      { email, password },
      {
        onSuccess: () => {
          alert("가입되었습니다!로그인해주세용");
          router.push(LOGIN_URL);
        },
        onError: (error) => {
          !!error.response && alert(error.response);
        },
      }
    );
  };

  const emailError: string = formState.errors.email?.message?.toString() ?? "";
  const passwordError: string =
    formState.errors.password?.message?.toString() ?? "";

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <input {...register("email")}></input>
      <p>{emailError || ""}</p>
      <input {...register("password")}></input>
      <p>{passwordError || ""}</p>
      <button disabled={!formState.isValid}>회원가입</button>
    </form>
  );
}
