import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import BasicFramework from '@/components/BasicFramework';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BasicFramework>
      <Component {...pageProps} />
    </BasicFramework>
  );
}
