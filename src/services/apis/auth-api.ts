import { LoginRequest, RegisterRequest } from '@/types/auth';
import fetchWithAuth from '@/services/apis/auth-fetcher';

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

async function login({ email, password }: LoginRequest) {
  const response = await fetch(`${BASEURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    data: { token },
  } = responseJson;

  return token;
}

async function getOwnProfile() {
  const response = await fetchWithAuth(`${BASEURL}/users/me`);

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
  login,
  getOwnProfile,
};
