export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      DB_LINK: string;
      // add more environment variables and their types here
    }
  }
}
