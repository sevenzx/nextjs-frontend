interface RouteConfig {
  path: string;
  text: string;
  icon?: string;
  role?: string[];
  items?: RouteConfig[];
  itemKey?: string;
}

/**
 * 路由配置
 * role 限制权限
 */
export const ROUTE_CONFIG: RouteConfig[] = [
  { path: '/home', text: '首页', icon: 'home' },
  { path: '/table', text: '表格', icon: 'list' },
  {
    path: '/manage',
    text: '管理',
    icon: 'setting',
    role: ['admin'],
    items: [
      { path: '/manage/data', text: '基础数据' },
      { path: '/manage/test', text: '测试功能' },
    ],
  },
];

/** 首页路径 */
export const HOME_PAGE_PATH: string = '/home';

/** 用户登录路径 */
export const USER_LOGIN_PATH: string = '/user/login';

/** 用户注册路径 */
export const USER_REGISTER_PATH: string = '/user/register';
