import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavigationFrame from '@/components/NavigationFrame';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG, USER_LOGIN_PATH, USER_REGISTER_PATH } from '@/config/route.config';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const NoNavRouteList = [USER_LOGIN_PATH, USER_REGISTER_PATH];

  useEffect(() => {
    let redirectPath = undefined;
    ROUTE_CONFIG.forEach((item) => {
      if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.path === router.pathname && subItem.redirect) {
            redirectPath = subItem.redirect;
          }
        });
      } else {
        if (item.path === router.pathname && item.redirect) {
          redirectPath = item.redirect;
        }
      }
    });

    if (redirectPath) {
      router.push(redirectPath).then((r) => {
        if (!r) {
          console.error('路由重定向跳转失败');
        }
      });
    }
  }, []);

  return NoNavRouteList.includes(router.pathname) ? (
    <Component {...pageProps} />
  ) : (
    <NavigationFrame>
      <Component {...pageProps} />
    </NavigationFrame>
  );
}
