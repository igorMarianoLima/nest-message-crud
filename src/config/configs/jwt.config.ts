export interface JwtConfig {
  secret: string;
  audience: string;
  issuer: string;
  ttl: number;
}

export const jwtConfig = (): {
  jwt: JwtConfig;
} => ({
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    audience: process.env.JWT_TOKEN_AUDIENCE ?? '',
    issuer: process.env.JWT_TOKEN_ISSUER ?? '',
    ttl: Number(process.env.JWT_TTL ?? '3600'),
  },
});
