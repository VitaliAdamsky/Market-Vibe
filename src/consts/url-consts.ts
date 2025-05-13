import { env } from 'src/environments/environment';

export const EXCHANGES = 'exchanges';
export const COINS = 'coins';
export const ADMIN = 'admin';
export const LOGIN = 'login';
export const COLORS = 'colors';
export const HEATMAP = 'heatmap';

//URLS
const renderBaseURL = env.renderBaseURL;

// export const KLINE_URLS = {
//   proxyKlineUrl: `${baseURL}/proxy-kline`,
// };

// export const GENERAL_URLS = {
//   configUrl: `${baseURL}/config`,
//   refreshAlertsReposUrl: `${baseURL}/refresh-repos`,
//   refreshDopplerConfigUrl: `${baseURL}/refresh-config`,
//   userAuthUrl: `${baseURL}/user-auth`,
//   emailValidationUrl: `${baseURL}/email/validate`,
//   cleanTriggeredAlertsUrl: `${baseURL}/clean-triggered-alerts`,
// };
