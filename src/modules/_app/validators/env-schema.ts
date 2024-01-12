import * as Joi from 'joi';
export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  VERSION: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  REDIS_URL: Joi.string().required(),
  REDIS_PORT: Joi.string().default(17152),
  REDIS_USERNAME: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_DATABASE: Joi.string().required(),

  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.string().required(),
  EMAIL_MAIL: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),

  SENTRY_DNS: Joi.string().required(),
  SENTRY_ENABLED: Joi.string().required(),

  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
  TWILIO_PHONE_DDI: Joi.string().required(),
  TWILIO_PHONE_DDD: Joi.string().required(),
  TWILIO_PHONE_NUMBER: Joi.string().required(),

  AWS_ACCESS: Joi.string().required(),
  AWS_SECRET: Joi.string().required(),
});
