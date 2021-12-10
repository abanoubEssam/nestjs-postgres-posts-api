import { EnvironmentVariables } from '../EnvironmentVariables';

export const developmentEnv: Partial<EnvironmentVariables> = {
  

  auth: {
    jwtSecret: 'App.Posts.Postgres.Dev',
    jwtLifetime: '7d',
    refreshTokenSecret: 'super secret app dev',
    refreshTokenLifetime: '14d',
  },
};
