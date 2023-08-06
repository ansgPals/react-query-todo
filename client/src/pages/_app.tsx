import CustomRender from "@/components/commons/layout/CustomRender";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CustomRender>
            <Component {...pageProps} />
          </CustomRender>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
