interface RouteItem {
  path: string;
  text: string;
  icon?: string;
  role?: string[];
  items?: RouteItem[];
  itemKey?: string;
}

export const routeConfig: RouteItem[] = [
  { path: '/home', text: '首页', icon: 'home' },
  { path: '/table', text: '表格', icon: 'list' },
  {
    path: 'manage',
    text: '管理',
    icon: 'setting',
    role: ['admin'],
    items: [
      { path: '/manage/data', text: '基础数据' },
      { path: '/manage/test', text: '测试功能' },
    ],
  },
];
