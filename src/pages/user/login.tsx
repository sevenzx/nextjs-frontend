import { Button, Form } from '@douyinfe/semi-ui';
import styles from './login.module.css';
import { userLoginUsingPOST } from '@/services/api-platform-user/userController';
import { useUserStore } from '@/lib/useZustand';
import { useRouter } from 'next/router';
import { HOME_PAGE_PATH } from '@/config/route.config';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { APP_NAME } from '@/config/constant';
import { USER_REGISTER_PATH } from '@/config/route.config';
import Head from "next/head";

export default function TablePage() {
  const router = useRouter();

  async function login(values: API.UserLoginDTO) {
    let res = (await userLoginUsingPOST(values)) as API.ResultUserVO;
    if (res) {
      useUserStore.setState({ user: res.data });
      await router.push(HOME_PAGE_PATH);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <h1>{APP_NAME}</h1>
      <Form
        onSubmit={(values) => login(values)}
        style={{
          width: 400,
          border: '2px solid var(--semi-color-border)',
          padding: '32px',
          borderRadius: '10px',
        }}
      >
        <Form.Input
          field="userAccount"
          noLabel={true}
          showClear={true}
          prefix={<IconUser />}
          style={{ width: '100%' }}
          size="large"
          placeholder="Enter your account"
        ></Form.Input>
        <Form.Input
          mode="password"
          field="userPassword"
          noLabel={true}
          prefix={<IconLock />}
          style={{ width: '100%' }}
          size="large"
          placeholder="Enter your password"
        ></Form.Input>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>
            <Button
              theme="borderless"
              style={{
                color: 'var(--semi-color-primary)',
                marginLeft: 10,
                cursor: 'pointer',
              }}
              onClick={() => router.push(USER_REGISTER_PATH)}
            >
              Sign up
            </Button>
          </p>
          <p>
            <Button
              theme="borderless"
              style={{
                color: 'var(--semi-color-primary)',
                marginLeft: 10,
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </Button>
          </p>
        </div>
        <Button htmlType="submit" type="primary" theme={'solid'} style={{ width: '100%' }}>
          Log in
        </Button>
      </Form>
    </div>
  );
}
