import { Avatar, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import {
  IconBell,
  IconGithubLogo,
  IconHelpCircle,
  IconHome,
  IconList,
  IconSetting,
} from '@douyinfe/semi-icons';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Head from 'next/head';
import styles from '@/components/navigation-frame.module.css';
import { useRouter } from 'next/router';
import { useUserStore } from '@/lib/useZustand';
import {
  getCurrentUserUsingGET,
  userLogoutUsingPOST,
} from '@/services/api-platform-user/userController';
import { ROUTE_CONFIG, USER_LOGIN_PATH, FORBIDDEN_PATH } from '@/config/route.config';
import { APP_NAME } from '@/config/constant';

const { Header, Footer, Sider, Content } = Layout;

export default function NavigationFrame({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);
  const [loading, setLoading] = useState<boolean>(true);

  const userLogout = async () => {
    await userLogoutUsingPOST();
    await router.push(USER_LOGIN_PATH);
  };

  // 通过路由配置生成Nav的items
  const getNavItems = () => {
    // 按需求配置icon
    const config2Icon = {
      home: <IconHome size={'large'} />,
      list: <IconList size={'large'} />,
      setting: <IconSetting size={'large'} />,
    };

    return ROUTE_CONFIG.filter((route) => {
      // 过滤掉不需要的元素
      if (route.redirect) {
        return false;
      }
      return !route.role || route.role.includes(user?.userRole as string);
    }).map((route) => {
      let newRoute = { ...route };
      newRoute.itemKey = route.path;
      // @ts-ignore
      newRoute.icon = config2Icon[route.icon];
      if (route.items) {
        newRoute.items = route.items
          .filter((item) => {
            return !item.role || item.role.includes(user?.userRole as string);
          })
          .map((item) => {
            item.itemKey = item.path;
            return item;
          });
      }
      return newRoute;
    });
  };

  useEffect(() => {
    const { pathname } = router;

    // 查看当前用户信息 是否登录
    getCurrentUserUsingGET().then((res) => {
      let currentUser = res.data;
      if (currentUser === null) {
        // 路由到/login
        router.push(USER_LOGIN_PATH).then((result) => {
          if (!result) {
            console.log('router push user login failed');
          }
        });
      } else {
        setUserInfo(currentUser as API.UserVO);
        // 权限控制
        let routeRole: string[] = [];
        for (let i = 0; i < ROUTE_CONFIG.length; i++) {
          const route = ROUTE_CONFIG[i];
          if (route.path === pathname) {
            routeRole = route.role || [];
            break;
          }
          if (route.items) {
            for (let j = 0; j < route.items.length; j++) {
              const item = route.items[j];
              if (item.path === pathname) {
                // 子项如果没配置权限 继承父项的权限
                if (item.role) {
                  routeRole = item.role;
                } else {
                  routeRole = route.role || [];
                }
              }
            }
          }
        }
        // @ts-ignore
        // 无权限访问
        if (routeRole.length > 0 && !routeRole.includes(currentUser.userRole)) {
          router.push(FORBIDDEN_PATH).then((r) => {
            if (!r) {
              console.log('router push forbidden failed');
            }
          });
        }
        console.log(res);
      }
    });

    // 需要设置Nav的selectedKeys来定位导航栏
    setSelectedKeys([pathname]);

    // 设置延时取消加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Layout className={styles.frame}>
      {/*写进document的head*/}
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          header={{
            logo: (
              <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" alt="logo" />
            ),
            text: APP_NAME,
          }}
          mode="horizontal"
          footer={
            <>
              <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
              <Button
                theme="borderless"
                icon={<IconHelpCircle size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
              <Dropdown
                trigger={'click'}
                position={'bottom'}
                render={
                  <Dropdown.Menu>
                    {/*TODO onClick*/}
                    <Dropdown.Item>修改信息</Dropdown.Item>
                    <Dropdown.Item onClick={() => userLogout()}>退出登录</Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Avatar size="small" src={user?.userAvatar} />
              </Dropdown>
            </>
          }
        ></Nav>
      </Header>
      <Layout>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)', marginTop: '8px' }}>
          <Nav
            items={getNavItems()}
            selectedKeys={selectedKeys}
            onSelect={(data) => {
              // @ts-ignore
              setSelectedKeys(data.selectedKeys);
              // @ts-ignore
              router.push(data.selectedKeys[0]).then((result) => {
                if (!result) {
                  console.log('router push failed');
                }
              });
            }}
            style={{ maxWidth: 200, height: '100%' }}
            footer={{
              collapseButton: true,
            }}
          ></Nav>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: '24px',
              backgroundColor: 'var(--semi-color-bg-0)',
              marginBottom: '100px',
            }}
          >
            {/*在这里插入子组件*/}
            {children}
          </Content>
          <Footer className={styles.footer}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconGithubLogo size="large" style={{ marginRight: '8px' }} />
              <span>Copyright © 2023 XUAN. All Rights Reserved. </span>
            </span>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
