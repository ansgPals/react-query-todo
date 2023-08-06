import globalStyles from "@/styles/global";
import { Global, ThemeProvider } from "@emotion/react";

import Layout from ".";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "@/hooks/theme";

export default function CustomRender(props: { children: any }) {
  const { children } = props;
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Layout>{children}</Layout>
      <ReactQueryDevtools position={"bottom-right"} />
    </ThemeProvider>
  );
}
