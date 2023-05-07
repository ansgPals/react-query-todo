import { useReactQueryPost } from "@/api/http";
import { TOKEN } from "@/constants/common";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailPasswordSchema } from "@/types/schema";
import { useRouter } from "next/router";
import { LOGIN_API_URL } from "@/constants/endpoint";
import { TODO_URL } from "@/constants/url";

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(emailPasswordSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const { mutation } = useReactQueryPost({ url: LOGIN_API_URL });

  const onClickSubmit = (data: IFormValues) => {
    const { email, password } = data;

    mutation(
      { email, password },
      {
        onSuccess: (res: ILoginData) => {
          Cookies.set(TOKEN, res.token);
        },
        onError: (error) => {
          !!error.response && alert(error.response);
        },
      }
    );
  };

  const emailErrorMessage: string =
    formState.errors.email?.message?.toString() ?? "";
  const passwordErrorMessage: string =
    formState.errors.password?.message?.toString() ?? "";

  useEffect(() => {
    const token = Cookies.get(TOKEN);
    if (!!token) {
      router.push(TODO_URL);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <input {...register("email")}></input>
      <p>{emailErrorMessage || ""}</p>
      <input {...register("password")}></input>
      <p>{passwordErrorMessage || ""}</p>
      <button disabled={!formState.isValid}>로그인</button>
      <p>
        계정이 없으십니까? <a href="/sign-up">회원가입</a>
      </p>
    </form>
  );
}
