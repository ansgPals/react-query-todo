import { useReactQuery } from "@/api/http";
import axios from "@/api/middlewares";
import AAA from "@/components/text";
interface TodoItemData {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function TodoList() {
  const { data, isLoading, refetch } = useReactQuery({
    url: `/todos`,
    renderLater: false,
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
