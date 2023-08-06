import { useReactQueryPost } from "@/api/http";
import { SIGN_UP_API_URL } from "@/constants/endpoint";
import { LOGIN_URL } from "@/constants/url";
import { ILoginFormValues } from "@/types";
import { signUpSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { LoginWrapper as SignUpWrapper } from "./login";
import { useToast } from "@/hooks/commons";
import { useState } from "react";

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });
  const [isPasswordMode, setPasswordMode] = useState(true);
  const router = useRouter();
  const { mutation } = useReactQueryPost({ url: SIGN_UP_API_URL });
  const { handleToast } = useToast();
  const onClickSubmit = (data: ILoginFormValues) => {
    const { email, password } = data;

    mutation(
      { email, password },
      {
        onSuccess: () => {
          handleToast("가입되었습니다!로그인해주세용");
          router.push(LOGIN_URL);
        },
        onError: (error) => {
          handleToast(error.data.details, "error");
        },
      }
    );
  };

  const handlePasswordMode = () => {
    setPasswordMode((prev) => !prev);
  };

  const emailError: string = formState.errors.email?.message?.toString() ?? "";
  const passwordError: string =
    formState.errors.password?.message?.toString() ?? "";
  const passwordCheckError: string =
    formState.errors.passwordCheck?.message?.toString() ?? "";
  return (
    <SignUpWrapper>
      <h1>SIGN-UP</h1>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div>
          <label>ID</label>
          <div>
            <input placeholder="이메일" {...register("email")}></input>
            <p>{emailError || ""}</p>
          </div>
        </div>
        <div>
          <label>
            PW <p onClick={handlePasswordMode}>view password</p>
          </label>
          <div>
            <input
              placeholder="비밀번호"
              type={isPasswordMode ? "password" : "text"}
              {...register("password")}
            ></input>
            <p>{passwordError || ""}</p>
          </div>
        </div>
        <div>
          <label>PW 확인</label>
          <div>
            <input
              placeholder="비밀번호확인"
              {...register("passwordCheck")}
              type={isPasswordMode ? "password" : "text"}
            ></input>
            <p>{passwordCheckError || ""}</p>
          </div>
        </div>

        <button disabled={!formState.isValid}>회원가입</button>
      </form>
    </SignUpWrapper>
  );
}
