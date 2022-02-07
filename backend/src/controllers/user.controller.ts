import User from "../models/user.model";
import extend from "lodash/extend";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { RequestHandler, Response, Request, NextFunction } from "express";
import { RequestWithProfile } from "../types";

const create: RequestHandler = async (req, res, next) => {
  const { body } = req;
  const user = new User(body);
  try {
    const newUser = await user.save();
    newUser.hashed_password = undefined;
    newUser.salt = undefined;
    return res
      .status(200)
      .json({ message: "Successfully signed up!", newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const list: RequestHandler = async (_, res) => {
  try {
    const users = await User.find().select("name email updated created"); // find all users, and only select the name, email, updated and created fields, this filter also will be applied when retrieving a single user by id
    return res.json(users);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const userById = async (
  req: RequestWithProfile,
  res: Response,
  next: NextFunction,
  id: any
) => {
  try {
    const user = await User.findById(id); // find the user by id
    // console.log(user, "this is from userById");

    if (!user) {
      // if the user is not found
      return res.status(400).json({
        // return a status code of 400 and a message
        error: "User not found",
      });
    }
    req.profile = user; // add the user to the request object
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error) || error,
    });
  }
};

const read = (req: RequestWithProfile, res: Response) => {
  const { profile } = req; // destructuring the profile from the request object
  if (!profile) return res.json({ error: "User not found" }); // if the profile is not found
  profile.hashed_password = undefined; // remove the hashed password from the response
  profile.salt = undefined; // remove the salt from the response
  return res.json(profile); // return the profile
};

const update = async (req: RequestWithProfile, res: Response) => {
  try {
    let user = req.profile; // get the user from the request object
    const { body } = req; // get the body from the request object
    // update the user with the new values
    extend(user, body); // extend the user with the new values, if a value in body already exists, it will be overwritten in the user object
    // console.log(req.body);
    // user = Object.assign(user, body); // assign the new values to the user object
    // console.log(user);

    if (!user) return res.status(400).json({ error: "User not found" });
    user.updated = Date.now();
    const updatedUser = await user.save(); // this will only save the properties that are in the mongooose schema, so if you add a property c to a schema {a,b}
    updatedUser.hashed_password = undefined;
    // console.log(updatedUser);
    updatedUser.salt = undefined;
    return res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const remove = async (req: RequestWithProfile, res: Response) => {
  try {
    let user = req.profile;
    if (!user) return res.status(400).json({ error: "User not found" });
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    return res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

export { create, list, userById, read, remove, update }; // the order of exporting is not important
