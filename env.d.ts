declare namespace NodeJS {
  interface ProcessEnv {
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    MONGODB_URI: string;
  }
}
