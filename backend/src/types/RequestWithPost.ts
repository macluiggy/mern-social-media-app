import type { PostSchemaDoc } from "../models/post.model";
import type { Request, Response, NextFunction } from "express";

export type RequestWithPost = Request & { post?: PostSchemaDoc };
