import { useEffect, useState } from 'react';

export default function ForbiddenPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 监听系统是否开启暗色模式
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // @ts-ignore
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          color: isDarkMode ? 'white' : 'black',
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          textAlign: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>403 | No Permission</h1>
      </div>
    </div>
  );
}
