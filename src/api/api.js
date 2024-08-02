const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY;
const K_REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

export const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URL}&response_type=code`;
