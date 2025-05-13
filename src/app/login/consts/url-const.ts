import { env } from 'src/environments/environment';
const authBaseUrl = env.authURL;
export const EMAIL_VALIDATION_URL = `${authBaseUrl}/email/validate`;
