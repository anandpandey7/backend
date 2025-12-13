// Configuration file for constants

export const JWT_SECRET = "your_jwt_secret_key_change_this_in_production";

// You can add more config here
export const JWT_EXPIRY = "7d";
export const BCRYPT_ROUNDS = 10;

// Or export as default object
export default {
  JWT_SECRET: "your_jwt_secret_key_change_this_in_production",
  JWT_EXPIRY: "7d",
  BCRYPT_ROUNDS: 10
};