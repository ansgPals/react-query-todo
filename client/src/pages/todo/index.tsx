import { useReactQuery } from "@/api/http";
import TodoItem from "@/components/TodoItem";

import { TODO_API_URL } from "@/constants/endpoint";
import { useAuth } from "@/hooks/commons";
import styled from "@emotion/styled";
import _ from "lodash";
import { useRouter } from "next/router";

export default function TodoList() {
  useAuth();
  const { data } = useReactQuery({
    url: TODO_API_URL,
  });
  const router = useRouter();

  const handleMoveToCreate = () => {
    router.push("/todo/create");
  };

  return (
    <TodoListWrapper>
      {!!data?.length &&
        _.map(data, (item, index) => (
          <TodoItem key={item.id + index} data={item} />
        ))}
      <PlusItem onClick={handleMoveToCreate}>+</PlusItem>
    </TodoListWrapper>
  );
}

const TodoListWrapper = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #161725;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;
const PlusItem = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: unset;
  font-size: 40px;
  bottom: 30px;
  right: 30px;
  color: orange;
  border: 3px solid orange;
  background-color: white;
  cursor: pointer;
`;
