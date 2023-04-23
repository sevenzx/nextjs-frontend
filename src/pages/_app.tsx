import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavigationFrame from '@/components/NavigationFrame';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noNavRoutes = ['/user/login', '/user/register'];

  // 判断当前路由是否在不需要嵌套的页面列表中
  if (noNavRoutes.includes(router.pathname)) {
    return <Component {...pageProps} />;
  }

  // 其他页面嵌套在 NavigationFrame 中
  return (
    <NavigationFrame>
      <Component {...pageProps} />
    </NavigationFrame>
  );
}
