import { EnvironmentVariables } from '../EnvironmentVariables';

export const defaultEnv: EnvironmentVariables = {
  server: {
    protocol: 'http',
    host: 'localhost',
    port: 3100,
  },
  auth: {
    jwtSecret: 'App.Posts.Postgres',
    jwtLifetime: '7d',
    refreshTokenSecret: 'super secret app',
    refreshTokenLifetime: '14d',
  },
};
