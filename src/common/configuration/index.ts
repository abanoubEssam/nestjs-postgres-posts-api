import { defaultEnv } from './environments/config.default';
import { developmentEnv } from './environments/config.development';

const env = process.env.NODE_ENV || 'development';

// Injects default values to current environment
const environmentFactory = (env: Record<string, any>) => ({
  ...defaultEnv,
  ...env,
});

const configurations = {
  development: developmentEnv,
};

const config = configurations[env];

export default () => environmentFactory(config);
