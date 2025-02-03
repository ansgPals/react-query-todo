import { useReactQueryPost } from "@/api/http";
import { TOKEN } from "@/constants/common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/types/schema";
import { useRouter } from "next/router";
import { LOGIN_API_URL } from "@/constants/endpoint";
import { TODO_URL } from "@/constants/url";
import { ILoginFormValues, ILoginData } from "@/types";
import styled from "@emotion/styled";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useToast } from "@/hooks/commons";

export default function Login() {
  const router = useRouter();
  const [isPasswordMode, setPasswordMode] = useState(true);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const { handleToast } = useToast();
  const { mutation } = useReactQueryPost({ url: LOGIN_API_URL });

  const onClickSubmit = (data: ILoginFormValues) => {
    const { email, password } = data;

    mutation(
      { email, password },
      {
        onSuccess: (res: ILoginData) => {
          Cookies.set(TOKEN, res.token);
          handleToast("로그인 성공쓰");
          router.push(TODO_URL);
        },
        onError: (res) => {
          handleToast(res.data.details, "error");
        },
      }
    );
  };

  const handlePasswordMode = () => {
    setPasswordMode((prev) => !prev);
  };

  const emailErrorMessage: string =
    formState.errors.email?.message?.toString() ?? "";
  const passwordErrorMessage: string =
    formState.errors.password?.message?.toString() ?? "";

  const token = Cookies.get(TOKEN);

  useEffect(() => {
    if (!!token) router.push("/todo");
  }, [token]);

  return (
    <LoginWrapper>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div>
          <label>ID</label>
          <div>
            <input placeholder="이메일" {...register("email")}></input>
            <p>{emailErrorMessage || ""}</p>
          </div>
        </div>
        <div>
          <label>
            PW<p onClick={handlePasswordMode}>view password</p>
          </label>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            ></input>
            <p>{passwordErrorMessage || ""}</p>
          </div>
        </div>
        <button disabled={!formState.isValid}>로그인</button>
        <p>
          계정이 없으십니까? <a href="/sign-up">회원가입</a>
        </p>
      </form>
    </LoginWrapper>
  );
}

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 35px rgba(23, 0, 58, 0.12);
  border-radius: 10px;
  padding: 50px;
  width: 800px;
  background-color: white;
  border-top: 10px solid ${(props) => props.theme.colors.main_point_color};
  height: fit-content;
  margin: 5% 0 0 0;
  > header {
    width: 100%;
    margin: 0 0 20px;
    position: relative;
    > button {
      position: absolute;
      right: -30px;
      top: -40px;
      font-size: 30px;
      width: 50px;
      height: 50px;
      text-align: center;
      background-color: unset;
      border: unset;
      cursor: pointer;
    }
  }
  > form {
    > div {
      display: flex;

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
          height: 20px;
          margin: 5px 0 0 0;
          font-size: 8px;
          color: red;
        }
      }
    }
    > button {
      width: 100%;
      font-size: 1.2rem;
      padding: 0.5rem;
      border-radius: 1rem;
      font-weight: 700;
      border: none;
      color: ${(props) => props.theme.colors.main_point_color};
      background-color: ${(props) => props.theme.colors.main_bg};
      margin: 10px 0;
      cursor: pointer;
      :hover {
        color: ${(props) => props.theme.colors.main_bg};
        background-color: ${(props) => props.theme.colors.main_point_color};
      }
      :disabled {
        background-color: #646464;
        color: white;
        cursor: unset;
        :hover {
          color: ${(props) => props.theme.colors.main_point_color};
        }
      }
    }
  }
  label {
    font-size: 1.2rem;
    line-height: 40px;
    font-weight: 700;
    width: 100px;
    text-align: center;
    position: relative;
    > p {
      position: absolute;
      font-size: 10px;
      bottom: 15px;
      right: 15px;
      background-color: ${(props) => props.theme.colors.main_point_color};
      color: white;
      padding: 3px;
      line-height: 13px;
      cursor: pointer;
    }
  }
  input {
    font-size: 1.1rem;
    width: 500px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.main_border};
    padding: 0px 10px;
  }
  textarea {
    font-size: 1.1rem;
    width: 500px;
    height: 200px;
    border-radius: 10px;
    padding: 10px;
  }
  a {
    font-size: 1.2rem;
    margin-top: 2rem;
    width: 100%;
    text-align: center;

    :hover {
      color: navy;
    }
    margin-bottom: 3rem;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    width: 100%;
    text-align: center;
  }
`;
