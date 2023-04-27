import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavigationFrame from '@/components/NavigationFrame';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from '@/config/route.config';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 用于判断是否需要展示导航栏
  const [needNavRouteList, setNeedNavRouteList] = useState<string[]>([]);

  useEffect(() => {
    let redirectPath = undefined;

    let list: string[] = [];
    ROUTE_CONFIG.forEach((item) => {
      if (item.items) {
        item.items.forEach((subItem) => {
          list.push(subItem.path);
          if (subItem.path === router.pathname && subItem.redirect) {
            redirectPath = subItem.redirect;
          }
        });
      } else {
        list.push(item.path);
        if (item.path === router.pathname && item.redirect) {
          redirectPath = item.redirect;
        }
      }
    });
    setNeedNavRouteList(list);

    if (redirectPath) {
      router.push(redirectPath).then((r) => {
        if (!r) {
          console.error('路由重定向跳转失败');
        }
      });
    }
  }, []);

  return needNavRouteList.includes(router.pathname) ? (
    <NavigationFrame>
      <Component {...pageProps} />
    </NavigationFrame>
  ) : (
    <Component {...pageProps} />
  );
}
