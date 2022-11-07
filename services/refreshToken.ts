import api from './api';

const refreshTokenFn = async () => {
  const refreshToken = JSON.parse(
    localStorage.getItem('@Genkidama:refreshToken') as string,
  );

  try {
    const response = await api.post('/sessions/refresh', {
      refreshToken,
    });

    const responseData = response.data;

    if (!responseData.accessToken) {
      // Logout here
      localStorage.removeItem('session');
      localStorage.removeItem('user');
    }

    localStorage.setItem('session', JSON.stringify(session));

    return session;
  } catch (error) {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
  }
};
