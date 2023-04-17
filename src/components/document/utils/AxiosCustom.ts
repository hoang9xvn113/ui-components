import Cookies from 'cookies-ts';
import { refreshToken } from '../api/Auth.api';

const cookies = new Cookies();

export const getLocalOauth2Token = () => {
  const oauth2Token = cookies.get('oauth2Token');
  return `Bearer ${oauth2Token}`;
};

export const getLocalAccessToken = () => {
  return cookies.get('accessToken');
};

export const updateLocalAccessToken = (accessToken: string, baseDomain: string) => {
  cookies.set('accessToken', accessToken, { expires: 30, domain: baseDomain });

};

export const getLanguage = () => {

  return cookies.get('language');
};

export const changeLanguage = (language: string) => {

  return cookies.set('language', language);
};

export const refreshAccessToken = async (baseDomain: string) => {
  return await refreshToken().then(r => {

    updateLocalAccessToken(r.data.accessToken, baseDomain);
  });
};

