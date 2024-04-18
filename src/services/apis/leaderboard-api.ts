const BASEURL = import.meta.env.VITE_BASEURL;

async function getLeaderboard() {
  const response = await fetch(`${BASEURL}/leaderboards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const {
    data: { leaderboards },
  } = responseJson;

  return leaderboards;
}

export default { getLeaderboard };
