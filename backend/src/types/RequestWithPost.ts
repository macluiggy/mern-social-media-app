import type { PostSchemaDoc } from "../models/post.model";
import type { Request, Response, NextFunction } from "express";

export type PostById = (
  request: Request & { post?: PostSchemaDoc },
  response: Response,
  next: NextFunction,
  id: string
) => void;
