import { useRouter } from "next/router";
import Create from "./create";
import { TODO_API_URL } from "@/constants/endpoint";
import { useReactQuery } from "@/api/http";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useReactQuery({
    url: `${TODO_API_URL}/${id}`,
    renderLater: !id,
  });
  return <Create data={data} />;
}
