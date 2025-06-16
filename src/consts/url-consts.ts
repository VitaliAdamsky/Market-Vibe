import { env } from 'src/environments/environment';

export const EXCHANGES = 'exchanges';
export const COINS = 'coins';
export const ADMIN = 'admin';
export const LOGIN = 'login';
export const COLORS = 'colors';
export const KLINE = 'kline';
export const FUNDING_RATE = 'funding-rate';
export const OPEN_INTEREST = 'open-interest';
export const MARKET_ACTIVITY = 'market-activity';
export const DATA_CHARTS = 'data-charts';
export const PANEL = 'panel';
export const COIN_METRICS = 'coin-metrics';
export const COIN_COMPARE = 'coin-compare';
export const SENTIMENT = 'sentiment';
export const MINI_SENTIMENT = 'mini-sentiment';
export const AGGREGATOR = 'aggregator';
export const MARKET_ANALYZER = 'market-analyzer';

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
