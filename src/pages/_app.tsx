import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavigationFrame from '@/components/NavigationFrame';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG, HOME_PAGE_PATH } from '@/config/route.config';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 用于判断是否需要展示导航栏
  const [needNavRouteList, setNeedNavRouteList] = useState<string[]>([]);

  useEffect(() => {
    if (router.pathname === '/') {
      router.push(HOME_PAGE_PATH).then((r) => {
        if (!r) {
          console.error('路由跳转首页失败');
        }
      });
    }
    let list: string[] = [];
    ROUTE_CONFIG.forEach((item) => {
      if (item.items) {
        item.items.forEach((subItem) => {
          list.push(subItem.path);
        });
      } else {
        list.push(item.path);
      }
    });
    setNeedNavRouteList(list);
  }, []);

  return needNavRouteList.includes(router.pathname) ? (
    <NavigationFrame>
      <Component {...pageProps} />
    </NavigationFrame>
  ) : (
    <Component {...pageProps} />
  );
}
