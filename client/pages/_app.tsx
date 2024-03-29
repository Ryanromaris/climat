import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import DialogProvider from '../context/DialogProvider';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: false,
      },
    },
  });
  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }
  return (
    <>
      <ChakraProvider>
        <DialogProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Head>
              <meta
                http-equiv='Content-Security-Policy'
                content='block-all-mixed-content'
              />
            </Head>
            <Component {...pageProps} />
          </QueryClientProvider>
        </DialogProvider>
      </ChakraProvider>
    </>
  );
}
