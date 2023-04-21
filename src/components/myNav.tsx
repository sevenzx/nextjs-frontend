import { Avatar, Breadcrumb, Button, Layout, Nav, Skeleton } from '@douyinfe/semi-ui';
import {
  IconBell,
  IconGithubLogo,
  IconHelpCircle,
  IconHistogram,
  IconHome,
  IconLive,
  IconSetting,
} from '@douyinfe/semi-icons';
import React from 'react';
import styles from './myNav.module.css';

const { Header, Footer, Sider, Content } = Layout;

export default function MyNav({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={styles.layout}>
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          defaultSelectedKeys={['Home']}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
            { itemKey: 'Histogram', text: '基础数据', icon: <IconHistogram size="large" /> },
            { itemKey: 'Live', text: '测试功能', icon: <IconLive size="large" /> },
            { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
          ]}
          header={{
            logo: (
              <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" alt="logo" />
            ),
            text: 'API PLATFORM',
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
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
                  YJ
                </Avatar>
              </>
            }
          ></Nav>
        </Header>
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
            routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
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
          {/*<span>*/}
          {/*  <span style={{ marginRight: '24px' }}>平台客服</span>*/}
          {/*  <span>反馈建议</span>*/}
          {/*</span>*/}
        </Footer>
      </Layout>
    </Layout>
  );
}
