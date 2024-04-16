import fetchWithAuth from './auth-fetcher';

const BASEURL = import.meta.env.VITE_BASEURL;

async function getAllUsers() {
  const response = await fetchWithAuth(`${BASEURL}/users`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { users },
  } = responseJson;

  return users;
}

export default {
  getAllUsers,
};
