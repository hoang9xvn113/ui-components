import axios from 'axios';

const BASE_URL_REFRESH_TOKEN = `/login-rest/v2.0/refreshtoken`;
const BASE_URL_LOG_OUT = `/login-rest/v2.0/logout`;

export const refreshToken = () => {
  return axios.post(
    BASE_URL_REFRESH_TOKEN,
    {},
    {
      withCredentials: true
    }
  );
};

export const logout = () => {
  return axios.post(
    BASE_URL_LOG_OUT,
    {},
    {
      withCredentials: true
    }
  );
}