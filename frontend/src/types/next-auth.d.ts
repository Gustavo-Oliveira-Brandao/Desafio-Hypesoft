import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    };
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {

  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
