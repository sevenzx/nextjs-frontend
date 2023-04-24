import { Button, Form } from '@douyinfe/semi-ui';
import styles from './login.module.css';
import { userLoginUsingPOST } from '@/services/api-platform-user/userController';
import { useUserStore } from '@/lib/useZustand';
import { useRouter } from 'next/router';
import { CURRENT_USER_KEY } from '@/config/constant.config';

export default function TablePage() {
  const router = useRouter();

  async function login(values: API.UserLoginDTO) {
    let res = (await userLoginUsingPOST(values)) as API.ResultUserVO;
    if (res) {
      useUserStore.setState({ user: res.data });
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res.data));
      await router.push('/home');
    }
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={(values) => login(values)} style={{ width: 400 }}>
        {({ values }) => (
          <>
            <Form.Input
              field="userAccount"
              label="账户"
              style={{ width: '100%' }}
              placeholder="Enter your account"
            ></Form.Input>
            <Form.Input
              mode="password"
              field="userPassword"
              label="密码"
              style={{ width: '100%' }}
              placeholder="Enter your password"
            ></Form.Input>
            <Form.Checkbox field="agree" noLabel>
              I have read and agree to the terms of service
            </Form.Checkbox>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Button
                  theme="borderless"
                  style={{
                    color: 'var(--semi-color-primary)',
                    marginLeft: 10,
                    cursor: 'pointer',
                  }}
                >
                  Sign up
                </Button>
              </p>
              <Button disabled={!values.agree} htmlType="submit" type="tertiary">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
