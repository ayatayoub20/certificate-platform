import "express-session";

declare module "express-session" {
  interface SessionData {
    admin?: {
      id: string;
      email: string;
    };
  }
}