/** App name */
export const APP_NAME: string = 'NEXT PLATFORM';

export const TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export const USER_ACCOUNT_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;

export const USER_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(.{8,16})$/;

export const SALT: string = 'xuan';

export const CLIENT_KEY: string = 'cli_299217f2d82b4a310b7c377b5dfceec8';

export const CLIENT_SECRET: string = 'b4ec0523ea00a59f89a511354f091e23';

export const GENDER_MAP = {
  0: { text: '未知', color: 'amber' },
  1: { text: '男', color: 'blue' },
  2: { text: '女', color: 'red' },
};

export const STATUS_MAP = {
  0: { text: '禁用', color: 'red' },
  1: { text: '启用', color: 'green' },
};
