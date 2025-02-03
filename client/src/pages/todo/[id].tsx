import { useRouter } from "next/router";
import Create from "./create";
import { TODO_API_URL } from "@/constants/endpoint";
import { useReactQuery } from "@/api/http";
import { useAuth } from "@/hooks/commons";

export default function Edit() {
  useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useReactQuery({
    url: `${TODO_API_URL}/${id}`,
    disable: !id,
  });

  return <Create data={data} />;
}
