import crypto from "crypto";

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(24).toString("hex");
};