import { useEffect, useState } from 'react';

export const withLogined = (InputComponent: any) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('key') === 'test') {
      setAuth(true);
    }
  }, []);

  return () => {
    return auth ? <InputComponent /> : <h3>로그인 부탁 드림!</h3>;
  };
};
