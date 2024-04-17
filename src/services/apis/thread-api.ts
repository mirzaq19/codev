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

async function upVoteThread(threadId: string) {
  const response = await fetchWithAuth(
    `${BASEURL}/threads/${threadId}/up-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { vote },
  } = responseJson;

  return vote;
}

async function downVoteThread(threadId: string) {
  const response = await fetchWithAuth(
    `${BASEURL}/threads/${threadId}/down-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { vote },
  } = responseJson;

  return vote;
}

async function neutralizeVote(threadId: string) {
  const response = await fetchWithAuth(
    `${BASEURL}/threads/${threadId}/neutral-vote`,
    {
      method: 'POST',
    },
  );

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { vote },
  } = responseJson;

  return vote;
}

async function getDetailThread(threadId: string) {
  const response = await fetchWithAuth(`${BASEURL}/threads/${threadId}`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { detailThread },
  } = responseJson;

  return detailThread;
}

export default {
  getAllThreads,
  upVoteThread,
  downVoteThread,
  neutralizeVote,
  getDetailThread,
};
