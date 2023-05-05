This is a [Next.js](https://nextjs.org/) project with [Semi Design](https://semi.design/zh-CN/)

## 开始使用

**安装依赖**

```bash
npm install
```

**项目配置**

1.   根据openapi生成前端代码（src/config/openapi.config.ts）后端使用[Knife4j](https://doc.xiaominfo.com/)

     ```typescript
     const apiConfigList = [
       {
         requestLibPath: axiosConfigPath,
         // 后端swagger文档路径
         schemaPath: 'http://localhost:7529/api/v2/api-docs',
         // 生成代码路径
         serversPath: './src/services',
         // 项目名
         projectName: 'user-service',
       },
       {
           // ...
       }
     ]
     ```

     配置完成后 在package.json中运行openapi或者

     ```bash
     ts-node ./src/config/openapi.config.ts
     ```

2.   axios配置（src/config/axios.config.ts）

     ```typescript
     const instance = axios.create({
       // baseURL: process.env.API_URL, // 设置API的URL
       baseURL: 'http://localhost:8090', // 网关的URL
       timeout: 5000, // 请求超时时间
       headers: {
         'Content-Type': 'application/json', // 设置请求头
       },
       withCredentials: true, // 设置跨域
     })
     ```

3.   配置全局权限控制（src/config/route.config.ts）

     ```typescript
     export const ROUTE_CONFIG: RouteConfig[] = [
       { path: '/', text: '默认', redirect: '/interface-info' },
       { path: '/interface-info', text: '首页', icon: 'home' },
       { path: '/table', text: '表格', icon: 'list' },
       {
         path: '/manage',
         text: '管理',
         icon: 'setting',
         role: ['admin'], // 通过role来进行导航栏和页面控制
         items: [
           { path: '/manage/user', text: '用户管理' },
           { path: '/manage/interface', text: '接口管理' },
         ],
       },
     ];
     ```

     还需要将`userRole`字段进行全局替换成自己的角色字段

     

