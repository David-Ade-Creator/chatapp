import dotenv from 'dotenv';

dotenv.config();

export default {
    REACT_APP_API_URL : process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    REACT_APP_GOOGLE_CLIENT : process.env.REACT_APP_GOOGLE_CLIENT || '',
    REACT_APP_FACEBOOK_CLIENT : process.env.REACT_APP_FACEBOOK_CLIENT || '',
}