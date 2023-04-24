import { Spin } from '@douyinfe/semi-ui';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" spinning={true} />
      <p>加载中...</p>
    </div>
  );
}
