import * as joi from '@hapi/joi';
import * as dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = joi
  .object({
    PORT: joi.number().default('3000'),
    NODE_ENV: joi
      .string()
      .allow('development', 'production', 'test')
      .default('development'),
    SECRET: joi.string().required(),

    // database config
    DATABASE_URL: joi
      .string()
      .when('NODE_ENV', { is: 'production', then: joi.string().required() }),
    PGHOST: joi
      .string()
      .when('NODE_ENV', { is: 'development', then: joi.string().required() }),
    PGUSER: joi
      .string()
      .when('NODE_ENV', { is: 'development', then: joi.string().required() }),
    PGPASSWORD: joi
      .string()
      .when('NODE_ENV', { is: 'development', then: joi.string().required() }),
    PGDATABASE: joi
      .string()
      .when('NODE_ENV', { is: 'development', then: joi.string().required() }),
    PGPORT: joi.number().port().default(5432),
    DATABASE_LOGGING: joi
      .boolean()
      .truthy('x')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(false),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  url: envVars.APP_URL,
  port: envVars.PORT,
  logLevel: envVars.LOG_LEVEL,
  isDevelopment: envVars.NODE_ENV === 'development',
  isTest: envVars.NODE_ENV === 'test',
  isProduction: envVars.NODE_ENV === 'production',
  secret: envVars.SECRET,
  db: {
    host: envVars.PGHOST,
    username: envVars.PGUSER,
    password: envVars.PGPASSWORD,
    name: `${envVars.PGDATABASE}${envVars.NODE_ENV === 'test' ? '_test' : ''}`,
    port: Number.parseInt(envVars.PGPORT, 2),
    logging: envVars.DATABASE_LOGGING,
  },
};
