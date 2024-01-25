const LICHESS_HOST = 'https://lichess.org';
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL || 'http://127.0.0.1:5000';

function login() {
    window.location.href = `${baseUrl}/login`;
  }

  async function authorize(username, timeframe) {
    const params = new URLSearchParams({ username, timeframe });
    fetch(`${baseUrl}/authorize?${params.toString()}`, { redirect: 'manual' });
  }
  
  export { login, authorize };
