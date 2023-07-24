import { useReactQuery, useReactQueryDelete } from "@/api/http";
import { TODO_API_URL } from "@/constants/endpoint";
import { TODO_URL } from "@/constants/url";
import { useToast } from "@/hooks/commons";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

export default function TodoItem(props: {
  data: { title: string; content: string; id: string };
}) {
  const { refetch } = useReactQuery({
    url: TODO_API_URL,
  });
  const { data } = props;
  const router = useRouter();
  const { title, content, id } = data;

  const handleMove = () => {
    router.push(`${TODO_URL}/${id}`);
  };
  const { handleToast } = useToast();
  const { mutation } = useReactQueryDelete({ url: `${TODO_API_URL}/${id}` });

  const handleTodoItemDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutation(
      { id },
      {
        onSuccess: () => {
          refetch();
          handleToast("삭제되었습니다.");
        },
        onError: (error) => {
          handleToast(error.data.details, "error");
        },
      }
    );
  };

  return (
    <TodoItemWrapper onClick={handleMove}>
      <h1>
        <button onClick={handleTodoItemDelete}>x</button>
      </h1>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </TodoItemWrapper>
  );
}

const TodoItemWrapper = styled.div`
  width: 300px;
  height: 200px;
  border: 3px solid orange;
  border-top: unset;
  border-radius: 10px;

  margin: 10px;
  background-color: white;
  cursor: pointer;
  > h1 {
    height: 30px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background-color: orange;
    display: flex;
    justify-content: flex-end;

    > button {
      line-height: 30px;
      font-size: 23px;
      width: 50px;
      text-align: center;
      cursor: pointer;
      background-color: unset;
      border: unset;
    }
  }
  > div {
    padding: 20px;
    h2 {
      font-size: 16px;
      font-weight: 700;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
    }
    p {
      margin: 5px 0 0 0;
      width: 100%;
      word-break: break-all;
      height: 109px;
      line-height: 18px;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
