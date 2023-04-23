import { Button, Form } from '@douyinfe/semi-ui'
import styles from './login.module.css'
import { userLoginUsingPOST } from '@/services/api-platform-user/userController'

export default function TablePage () {
  async function userLogin (values: API.UserLoginDTO) {
    let res = await userLoginUsingPOST(values)
    console.log(res)
  }

  return (
    <div className={styles.div}>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
          margin: '0 auto',
        }}
      >
        <Form onSubmit={(values) => userLogin(values)} style={{ width: 400 }}>
          {({ formState, values, formApi }) => (
            <>
              <Form.Input
                field="userAccount"
                label="账户"
                style={{ width: '100%' }}
                placeholder="Enter your account"
              ></Form.Input>
              <Form.Input
                field="userPassword"
                label="密码"
                style={{ width: '100%' }}
                placeholder="Enter your password"
              ></Form.Input>
              <Form.Checkbox field="agree" noLabel>
                I have read and agree to the terms of service
              </Form.Checkbox>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
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
    </div>
  )
}
