import { useReactQuery } from "@/api/http";
import axios from "@/api/middlewares";

import { TODO_LIST_API_URL } from "@/constants/endpoint";

export default function TodoList() {
  const { data, isLoading, refetch } = useReactQuery({
    url: TODO_LIST_API_URL,
  });

  return isLoading ? (
    <> 로딩중 </>
  ) : (
    <>
      <button onClick={refetch}>리패치!!</button>
    </>
  );
}
