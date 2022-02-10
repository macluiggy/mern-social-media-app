import User from "../models/user.model";
import extend from "lodash/extend";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { RequestHandler, Response, Request, NextFunction } from "express";
import { RequestWithProfile } from "../types";
import formidable from "formidable";
import fs from "fs";
import { Z_BINARY } from "zlib";
// const profileImage = require("./../../../frontend/src/assets/images/profile-pic.png");
// const profileImage = require("./../images/profile-pic.png");
// import profileImage from "./../../../frontend/src/assets/images/profile-pic.png";
// import * as profileImage from "./../images/profile-pic.png";

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
    const users = await User.find().select(
      "name email updated created about potho"
    ); // find all users, and only select the name, email, updated and created fields, this filter also will be applied when retrieving a single user by id
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
  let form = new formidable.IncomingForm();
  // console.log(form);
  form["keepExtensions"] = true;
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ error: "Photo could not be uploaded" });
    let user = req.profile;
    // console.log(user); // this have the user data with the user data and maybe with the photo if it was already uploaded
    extend(user, fields); // extend with simple string data values to update like name, email, etc.
    // console.log(files); // this the photo data object extracted from the form data from the request object that is going to be uploaded
    // console.log(fields) // this has the simple string data values to update like name, email, etc.
    if (!user) return res.status(400).json({ error: "User not found" });
    if (files.photo) {
      // console.log(files.photo);
      console.log(fields);
      // console.log(fs.readFileSync(files["photo"]["filepath"]));

      // console.log(user, "user compa");
      user.photo.data = fs.readFileSync(files["photo"]["filepath"]);
      user.photo.contentType = files.photo["mimetype"];
      // console.log(user, "user compa mutado");
    }
    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(error),
      });
    }
  });
  // try {
  //   let user = req.profile; // get the user from the request object
  //   const { body } = req; // get the body from the request object
  //   // update the user with the new values
  //   extend(user, body); // extend the user with the new values, if a value in body already exists, it will be overwritten in the user object
  //   console.log(req.body);
  //   // user = Object.assign(user, body); // assign the new values to the user object
  //   // console.log(user);

  //   if (!user) return res.status(400).json({ error: "User not found" });
  //   user.updated = Date.now();
  //   const updatedUser = await user.save(); // this will only save the properties that are in the mongooose schema, so if you add a property c to a schema {a,b}
  //   updatedUser.hashed_password = undefined;
  //   // console.log(updatedUser);
  //   updatedUser.salt = undefined;
  //   return res.json(updatedUser);
  // } catch (error) {
  //   return res.status(400).json({
  //     error: dbErrorHandler.getErrorMessage(error),
  //   });
  // }
};

const photo = (req, res, next) => {
  // console.log("photo mi llave", req.profile);
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  // console.log("default photo mi llave");
  // return res.status(200).sendFile(process.cwd() + profileImage);
  res.send("default photo");
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

export { create, list, userById, read, remove, update, photo, defaultPhoto }; // the order of exporting is not important
