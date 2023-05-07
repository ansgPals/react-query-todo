import { useReactQuery } from "@/api/http";
import axios from "@/api/middlewares";
import AAA from "@/components/text";
import { TODO_LIST_API_URL } from "@/constants/endpoint";

export default function TodoList() {
  const { data, isLoading, refetch } = useReactQuery({
    url: TODO_LIST_API_URL,
  });

  console.log(data);

  return isLoading ? (
    <> 로딩중 </>
  ) : (
    <>
      aaa <AAA />
      <button onClick={refetch}>리패치!!</button>
    </>
  );
}
