const LICHESS_HOST = 'https://lichess.org';
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL || 'http://127.0.0.1:5000';

function login(username, timeframe) {
  const state = btoa(JSON.stringify({ username, timeframe }));
  window.location.href = `${baseUrl}/login?state=${state}`;
}

  export { login };
