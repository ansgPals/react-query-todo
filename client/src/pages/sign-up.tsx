import { useReactQueryPost } from "@/api/http";
import axios from "@/api/middlewares";
import { TOKEN } from "@/constants/common";
import { emailPasswordSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface SignUpData {
  message: string;
  token: string;
}

export const SIGN_UP_API_URL = "/users/create";

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
          router.push("/login");
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
