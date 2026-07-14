declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      S3_ACCESS_KEY: string;
      S3_SECRET_ACCESS_KEY: string;
      S3_BUCKET_NAME: string;
      S3_BUCKET_REGION: string;
      S3_ENDPOINT: string;
    }
  }
}

export {};
