import authApi from '@/services/apis/auth-api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${authApi.getAccessToken()}`,
    },
  });
}

export default fetchWithAuth;
