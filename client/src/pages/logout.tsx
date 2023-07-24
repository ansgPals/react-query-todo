import { TOKEN } from "@/constants/common";
import { LOGIN_URL } from "@/constants/url";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove(TOKEN);
    router.push(LOGIN_URL);
  }, []);

  return <></>;
}
