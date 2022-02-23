import 'globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

//React-Queryの設定
const defaultOptions = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
};

const queryClient = new QueryClient(defaultOptions);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>アパレル事業者向けの情報共有ツール Cloth-To</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
