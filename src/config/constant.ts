/** App name */
export const APP_NAME: string = 'NEXT PLATFORM';

export const TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export const USER_ACCOUNT_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;

export const USER_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(.{8,16})$/;

export const GENDER_MAP = {
  0: { text: '未知', color: 'amber' },
  1: { text: '男', color: 'blue' },
  2: { text: '女', color: 'red' },
};
