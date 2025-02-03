import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ICreateFormValues, createSchema } from "@/types";
import { useRouter } from "next/router";
import { useReactQueryPost, useReactQueryPut } from "@/api/http";
import { TODO_API_URL } from "@/constants/endpoint";
import { TODO_URL } from "@/constants/url";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useAuth, useToast } from "@/hooks/commons";
export default function Create(props: {
  data: { title: string; content: string; id: string };
}) {
  useAuth();
  const { data } = props;
  const isEdit = !!data;
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<ICreateFormValues>({
      resolver: yupResolver(createSchema),
      mode: "onChange",
    });
  const { handleToast } = useToast();
  const router = useRouter();
  const { mutation: createMutation } = useReactQueryPost({ url: TODO_API_URL });
  const { mutation: updateMutation } = useReactQueryPut({
    url: `${TODO_API_URL}/${data?.id}`,
  });
  const inputValue = watch();
  const [isNotChanged, handleIsNotChanged] = useState(true);

  const onClickSubmit = (data: ICreateFormValues) => {
    const { title, content } = data;
    const mutation = isEdit ? updateMutation : createMutation;
    mutation(
      { title, content },
      {
        onSuccess: () => {
          handleToast(`${isEdit ? "수정" : "등록"}되었습니다.`);
          router.push(TODO_URL);
        },
        onError: (error) => {
          handleToast(error.data.details, "error");
        },
      }
    );
  };

  const titleError: string = formState.errors.title?.message?.toString() ?? "";
  const contentError: string =
    formState.errors.content?.message?.toString() ?? "";

  const handleCancel = async () => {
    const emptiedValue = !inputValue.content && !inputValue.title;
    if (isEdit ? isNotChanged : emptiedValue) {
      router.push(TODO_URL);
    } else {
      const result = await confirm(
        "페이지를 이탈하시면 작성하신내용이 저장되지 않습니다."
      );
      result && router.push(TODO_URL);
    }
  };

  const isButtonDisabled = !formState.isValid || isNotChanged;

  useEffect(() => {
    if (data) {
      setValue("content", data.content);
      setValue("title", data.title);
    }
  }, [data]);

  useEffect(() => {
    const isNotChanged =
      inputValue.content === data?.content && inputValue.title === data?.title;
    handleIsNotChanged(isNotChanged);
  }, [inputValue]);

  return (
    <CreateWrapper>
      <header>
        <button onClick={handleCancel}>x </button>
      </header>

      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div>
          <input
            placeholder="제목 최대 40자"
            {...register("title")}
            maxLength={40}
          ></input>{" "}
          <p>{titleError || ""}</p>
          <textarea placeholder="내용" {...register("content")}></textarea>
          <p>{contentError || ""}</p>
        </div>
        <button disabled={isButtonDisabled}>{isEdit ? "수정" : "등록"}</button>
      </form>
    </CreateWrapper>
  );
}

export const CreateWrapper = styled.div`
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
  margin: 20px 0 0 0;
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
      width: 630px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid gray;
      border-radius: 10px;
      p {
        height: 10px;
        font-size: 8px;
        color: red;
      }
    }
    > button {
      width: 100%;
      font-size: 15px;
      padding: 10px;
      border-radius: 5px;
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
        background-color: #5b5b5b;
        color: white;
        cursor: unset;
        :hover {
          color: ${(props) => props.theme.colors.main_point_color};
        }
      }
    }
  }

  input {
    font-size: 16px;
    border: unset;
    border-bottom: 1px solid ${(props) => props.theme.colors.main_border};
    width: 600px;
    height: 40px;
    padding: 0px 10px;
    font-weight: 700;
    :focus {
      outline: none;
    }
  }
  textarea {
    font-size: 14px;
    width: 600px;
    height: 400px;
    border: unset;
    padding: 10px;
    resize: none;

    :focus {
      outline: none;
    }
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
    font-weight: 700;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
  }
`;
