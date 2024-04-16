import { RegisterRequest } from '@/types/auth';

const BASEURL = import.meta.env.VITE_BASEURL;

const getAccessToken = () => localStorage.getItem('accessToken');

const putAccessToken = (accessToken: string) =>
  localStorage.setItem('accessToken', accessToken);

const removeAccessToken = () => localStorage.removeItem('accessToken');

async function register({ name, email, password }: RegisterRequest) {
  const response = await fetch(`${BASEURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { user },
  } = responseJson;

  return user;
}

export default {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
};
