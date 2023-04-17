import axios from 'axios';
import { getLanguage, getLocalAccessToken, getLocalOauth2Token, updateLocalAccessToken } from '../../utils/AxiosCustom';
import { message } from 'antd';
import { refreshToken } from '../../api/Auth.api';

export const setupAxios = (baseURL: string, baseDomain: string) => {

  axios.interceptors.request.use(
    (config) => {

      const oauth2Token = getLocalOauth2Token();
      const accessToken = getLocalAccessToken();
      const language = getLanguage();

      config.baseURL = baseURL;

      config.headers['Authorization'] = oauth2Token;
      config.headers['dogoo-x-user-context-request'] = accessToken;
      config.headers['Accept-Language'] = language || 'vi';

      return config;
    },
    (error) => {

      return Promise.reject(error);
    }
  );


  axios.interceptors.response.use(
    (res) => {

      const config = res.config;

      return res;
    },
    async (err) => {

      const originalConfig = err.config;

      const response = err.response;


      const data = response?.data;
      const status = response?.status;

      const detail = data?.detail || data?.message || data?.title || data?.status || 'Error';

      if (detail && detail !== 'refresh.token.is.required' && status !== 403 && status !== 401 && !(originalConfig?.url.includes('refreshtoken') && status === 500)) {
        switch (status) {
          case 500:
            // message.error(detail)
            message.open({
              content: detail,
              type: 'error'
            });
            break;
          default:
            // message.warning(detail)
            message.open({
              content: detail,
              type: 'warning'
            });
        }

      }

      if (!originalConfig?.url.includes('/login-rest/v2.0/signin')) {
        // Access Token was expired
        if (status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await refreshToken();
            const { accessToken } = rs.data;
            updateLocalAccessToken(accessToken, baseDomain);
            return axios(originalConfig);
          } catch (_error) {
            // if (_error.config.url === `${_error.config.baseURL}/login-rest/v2.0/refreshtoken` && _error.response.status === 400) {
            //   store.dispatch(logoutStart());
            // }
            return Promise.reject(_error);
          }
        }
      }

      if (status === 403 && !originalConfig._retry) {
        // store.dispatch(logoutStart());
        // originalConfig._retry = true;
        // try {
        //     const rs = await getToken();
        //     updateLocalOauth2Token(rs.data);
        //     return axiosInstance(originalConfig);
        // } catch (_error) {
        //     return Promise.reject(_error);
        // }
      }

      return Promise.reject(err);
    }
  );
};
export default setupAxios;
