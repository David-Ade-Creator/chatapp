import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb://localhost/chatapp',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PORT: process.env.PORT || 5050,
    MAIL_KEY :  process.env.MAIL_KEY || 'td',
    JWT_ACCOUNT_ACTIVATION : process.env.JWT_ACCOUNT_ACTIVATION || 'qwerty',
    JWT_RESET_PASSWORD : process.env.JWT_RESET_PASSWORD || 'sb',
    EMAIL_TO : process.env.EMAIL_TO || 'receiver',
    EMAIL_FROM : process.env.EMAIL_FROM || 'sender',
    CLIENT_URL: process.env.CLIENT_URL || 'CLIENT_URL = http://localhost:3000',
}