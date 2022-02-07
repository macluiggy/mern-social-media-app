import dotenv from "dotenv";
dotenv.config();
const con = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "sosote",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default con;

interface FN<T> {
  (params: T): T;
}
const fn2: FN<string> = (params) => params;

console.log(!!{});
