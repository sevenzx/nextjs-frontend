import { Avatar, Breadcrumb, Button, Dropdown, Layout, Nav, Skeleton } from '@douyinfe/semi-ui';
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
import { CURRENT_USER_KEY } from '@/config/constant.config';

const { Header, Footer, Sider, Content } = Layout;

/**
 * 根据itemKey获取层级文本
 * @param items
 * @param targetKey
 * @param prefix
 */
function setBreadcrumbRoutes(items: any[], targetKey: string, prefix = ''): string[] {
  let result: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemText = `${prefix}${item.text}`;
    if (item.itemKey === targetKey) {
      result.push(itemText);
      break;
    }
    if (item.items) {
      const subResult = setBreadcrumbRoutes(item.items, targetKey, `${prefix}`);
      if (subResult.length) {
        result.push(itemText);
        result = result.concat(subResult);
        break;
      }
    }
  }
  return result;
}

export default function NavigationFrame({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const routes = [
    { itemKey: '/home', text: '首页', icon: <IconHome size="large" /> },
    { itemKey: '/table', text: '表格', icon: <IconList size="large" /> },
    {
      itemKey: 'manage',
      text: '管理',
      icon: <IconSetting size="large" />,
      items: [
        { itemKey: '/manage/data', text: '基础数据' },
        { itemKey: '/manage/test', text: '测试功能' },
      ],
    },
  ];

  // 如果是通过URL直接访问 需要设置Nav的selectedKeys来定位导航栏
  useEffect(() => {
    // 是否登录
    let userJsonStr = localStorage.getItem(CURRENT_USER_KEY);
    if (userJsonStr === null) {
      // 路由到/login
      router.push('/user/login').then((result) => {
        if (!result) {
          console.log('router1 push failed');
        }
      });
    }

    // 去后端查询当前用户信息用于动态刷新
    getCurrentUserUsingGET().then((res) => {
      setUserInfo(res.data as API.UserVO);
      console.log(res);
    });

    const { pathname } = router;
    if (pathname === '/') {
      setSelectedKeys(['/home']);
      // 路由到/home
      router.push('/home').then((result) => {
        if (!result) {
          console.log('router1 push failed');
        }
      });
    } else {
      setSelectedKeys([pathname]);
    }
    // 设置延时取消加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const userLogout = async () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    // window.location.href = '/user/login';
    await userLogoutUsingPOST();
    await router.push('/user/login');
  };

  return loading ? (
    <Loading />
  ) : (
    <Layout className={styles.frame}>
      {/*写进document的head*/}
      <Head>
        <title>API PLATFORM</title>
      </Head>
      <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          header={{
            logo: (
              <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" alt="logo" />
            ),
            text: 'API PLATFORM',
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
            items={routes}
            selectedKeys={selectedKeys}
            onSelect={(data) => {
              console.log('trigger onSelect: ', data.selectedKeys);
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
            }}
          >
            <Breadcrumb
              style={{
                marginBottom: '24px',
              }}
              compact={false}
              routes={setBreadcrumbRoutes(routes, router.pathname)}
            />
            <div className={styles.skeleton}>
              <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={false}>
                {children}
              </Skeleton>
            </div>
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
