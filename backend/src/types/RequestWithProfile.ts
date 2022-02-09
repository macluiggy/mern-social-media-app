import { Request, NextFunction } from "express";
import { IUserDoc } from "../models/user.model";
import type { Fields } from "formidable";
export interface RequestWithProfile extends Request {
  profile?:
    | (IUserDoc & {
        _id: any;
      })
    | null;
}
// export interface RequestHandlerWithProfile {
//   (RequestWithProfile, Response, NextFunction, id_: any): Promise<void>;
// }
