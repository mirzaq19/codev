import fetchWithAuth from './auth-fetcher';

const BASEURL = import.meta.env.VITE_BASEURL;

async function getAllThreads() {
  const response = await fetchWithAuth(`${BASEURL}/threads`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { threads },
  } = responseJson;

  return threads;
}

export default {
  getAllThreads,
};
