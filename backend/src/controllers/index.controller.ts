import { Request } from "express";
export const hello = (req, res) => {
  res.send("Hello World from api!");
};
