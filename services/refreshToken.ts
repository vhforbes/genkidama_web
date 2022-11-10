import mem from 'mem';
import api from './api';

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem(
    '@Genkidama:refreshToken',
  ) as string;
  try {
    const response = await api.post('/sessions/refresh', {
      refreshToken,
    });

    const responseData = response.data;

    if (!responseData.token) {
      window.location.href = '/sign-in';
      localStorage.removeItem('@Genkidama:token');
      localStorage.removeItem('@Genkidama:refreshToken');
      localStorage.removeItem('@Genkidama:user');
    }

    localStorage.setItem('@Genkidama:token', responseData.token);

    return responseData.token;
  } catch (error) {
    window.location.href = '/sign-in';
    localStorage.removeItem('@Genkidama:token');
    localStorage.removeItem('@Genkidama:refreshToken');
    localStorage.removeItem('@Genkidama:user');

    return null;
  }
};

const maxAge = 10000;

const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

export default memoizedRefreshToken;
