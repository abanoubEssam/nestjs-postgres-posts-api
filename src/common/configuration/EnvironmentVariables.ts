
export interface EnvironmentVariables {
  server: {
    protocol?: string;
    host: string;
    port: number;
  };

  auth: {
    jwtSecret: string;
    jwtLifetime: string;
    refreshTokenSecret: string;
    refreshTokenLifetime: string;
  };

}
