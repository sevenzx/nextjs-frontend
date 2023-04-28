import { Button, Form, Toast } from '@douyinfe/semi-ui';
import styles from './user.module.css';
import { userRegisterUsingPOST } from '@/services/api-platform-user/userController';
import { useRouter } from 'next/router';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { APP_NAME, USER_ACCOUNT_REGEX, USER_PASSWORD_REGEX } from '@/config/constant';
import { USER_LOGIN_PATH } from '@/config/route.config';
import Head from 'next/head';
import { useState } from 'react';

export default function UserRegister() {
  const [pwd, setPwd] = useState();
  const router = useRouter();

  async function register(values: API.UserRegisterDTO) {
    // @ts-ignore
    let res = (await userRegisterUsingPOST(values)) as API.ResultLong;
    if (res.data) {
      Toast.success('Register success');
      await router.push(USER_LOGIN_PATH);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <h2>{`WELCOME TO ${APP_NAME}`}</h2>
      <Form
        onSubmit={(values) => register(values)}
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
          rules={[
            { required: true, message: 'need account' },
            {
              pattern: USER_ACCOUNT_REGEX,
              message: 'start with a letter and contain 4 to 16 characters',
            },
          ]}
          trigger="change"
        ></Form.Input>
        <Form.Input
          mode="password"
          field="userPassword"
          noLabel={true}
          prefix={<IconLock />}
          style={{ width: '100%' }}
          size="large"
          placeholder="Enter your password"
          onChange={(value) => {
            // @ts-ignore
            setPwd(value);
          }}
          rules={[
            { required: true, message: 'need password' },
            {
              pattern: USER_PASSWORD_REGEX,
              message: 'contain 8 to 16 letters, digits, and symbols',
            },
          ]}
          trigger="change"
        ></Form.Input>
        <Form.Input
          mode="password"
          field="checkPassword"
          noLabel={true}
          prefix={<IconLock />}
          style={{ width: '100%' }}
          size="large"
          placeholder="Enter your password again"
          rules={[
            { validator: (rule, value) => value === pwd, message: 'not the same as a password' },
          ]}
          trigger="change"
        ></Form.Input>
        <Button
          htmlType="submit"
          type="primary"
          theme={'solid'}
          style={{ width: '100%', marginTop: '24px' }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
