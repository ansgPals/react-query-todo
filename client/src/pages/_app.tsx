import Layout from "@/components/commons/layout";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
          <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools position={"bottom-right"} />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
