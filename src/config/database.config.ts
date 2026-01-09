export interface DatabaseConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
}

export const databaseConfig = (): {
  database: DatabaseConfig;
} => ({
  database: {
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_SCHEMA || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT),
  },
});
