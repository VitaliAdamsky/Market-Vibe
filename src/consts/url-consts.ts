import { env } from 'src/environments/environment';

export const EXCHANGES = 'exchanges';
export const COINS = 'coins';
export const ADMIN = 'admin';
export const LOGIN = 'login';

//URLS
const baseURL = env.baseURL;

export const COINS_URLS = {
  coinsUrl: `${baseURL}/proxy-coins`,
  coinsRefreshUrl: `${baseURL}/proxy-coins/refresh`,
};

export const KLINE_URLS = {
  proxyKlineUrl: `${baseURL}/proxy-kline`,
};

export const GENERAL_URLS = {
  configUrl: `${baseURL}/config`,
  refreshAlertsReposUrl: `${baseURL}/refresh-repos`,
  refreshDopplerConfigUrl: `${baseURL}/refresh-config`,
  userAuthUrl: `${baseURL}/user-auth`,
  emailValidationUrl: `${baseURL}/email/validate`,
  cleanTriggeredAlertsUrl: `${baseURL}/clean-triggered-alerts`,
};
