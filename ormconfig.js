const dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production';

let env = {};
if (isProduction) {
  env.url = process.env.DATABASE_URL;
} else {
  env.host = process.env.PGHOST;
  env.port = Number.parseInt(process.env.PGPORT, 2);
  env.username = process.env.PGUSER;
  env.password = process.env.PGPASSWORD;
  env.database = `${process.env.PGDATABASE}${
    process.env.NODE_ENV == 'test' ? '_test' : ''
  }`;
}

module.exports = {
  ...env,
  type: 'postgres',
  entities: ['dist/**/*.model.js'],
  logging: process.env.DATABASE_LOGGING,
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
