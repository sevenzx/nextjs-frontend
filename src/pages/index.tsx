import { Avatar, Breadcrumb, Button, Layout, Nav, Skeleton } from '@douyinfe/semi-ui';

const { Header, Footer, Sider, Content } = Layout;
import {
  IconBell,
  IconGithubLogo,
  IconHelpCircle,
  IconHome,
  IconList,
  IconSetting,
} from '@douyinfe/semi-icons';
import React, { ReactText, useState } from 'react';
import styles from '@/styles/home.module.css';
import HomePage from '@/components/HomePage';
import InfoTable from '@/components/InfoTable';
import Live from '@/components/Live';
import Data from '@/components/Data';

/**
 * 根据itemKey获取层级文本
 * @param items
 * @param targetKey
 * @param prefix
 */
function getTextHierarchyByItemKey(items: any[], targetKey: ReactText, prefix = ''): string[] {
  let result: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemText = `${prefix}${item.text}`;
    if (item.itemKey === targetKey) {
      result.push(itemText);
      break;
    }
    if (item.items) {
      const subResult = getTextHierarchyByItemKey(item.items, targetKey, `${prefix}`);
      if (subResult.length) {
        result.push(itemText);
        result = result.concat(subResult);
        break;
      }
    }
  }
  return result;
}

export default function Home() {
  const [selectedKeys, setSelectedKeys] = useState<ReactText[]>(['Home']);

  const [pageNode, setPageNode] = useState<React.ReactNode>(<HomePage />);

  const routes = {
    Home: <HomePage />,
    Table: <InfoTable />,
    Live: <Live />,
    Data: <Data />,
  };

  const items = [
    { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
    { itemKey: 'Table', text: '表格', icon: <IconList size="large" /> },
    {
      itemKey: 'Manage',
      text: '管理',
      icon: <IconSetting size="large" />,
      items: [
        { itemKey: 'Data', text: '基础数据' },
        { itemKey: 'Live', text: '测试功能' },
      ],
    },
  ];

  return (
    <Layout className={styles.frame}>
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
              <Avatar color="orange" size="small">
                ZX
              </Avatar>
            </>
          }
        ></Nav>
      </Header>
      <Layout>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)', marginTop: '8px' }}>
          <Nav
            selectedKeys={selectedKeys}
            onSelect={(data) => {
              console.log('trigger onSelect: ', data);
              setSelectedKeys([...data.selectedKeys]);
            }}
            onClick={(data) => {
              console.log('onClick', data);
              // data 没有isOpen属性
              if (!data.isOpen) {
                // @ts-ignore
                setPageNode(routes[data.itemKey]);
              }
            }}
            style={{ maxWidth: 220, height: '100%' }}
            items={items}
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
              routes={getTextHierarchyByItemKey(items, selectedKeys[0])}
            />
            <div className={styles.skeleton}>
              <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={false}>
                {pageNode}
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
