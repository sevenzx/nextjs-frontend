interface RouteConfig {
  path: string;
  redirect?: string;
  text: string;
  icon?: string;
  role?: string[];
  items?: RouteConfig[];
  itemKey?: string;
}

/**
 * 路由配置
 * role 权限控制
 */
export const ROUTE_CONFIG: RouteConfig[] = [
  { path: '/', text: '默认', redirect: '/home' },
  { path: '/home', text: '首页', icon: 'home' },
  { path: '/table', text: '表格', icon: 'list' },
  {
    path: '/manage',
    text: '管理',
    icon: 'setting',
    role: ['admin'],
    items: [
      { path: '/manage/data', text: '基础数据' },
      { path: '/manage/user', text: '用户管理' },
    ],
  },
];

/** 首页路径 */
export const HOME_PAGE_PATH: string = '/home';

/** 403路径 */
export const FORBIDDEN_PATH: string = '/403';

/** 用户登录路径 */
export const USER_LOGIN_PATH: string = '/user/login';

/** 用户注册路径 */
export const USER_REGISTER_PATH: string = '/user/register';
