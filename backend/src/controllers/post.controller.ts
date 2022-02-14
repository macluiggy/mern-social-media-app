import dbErrorHandler from "../helpers/dbErrorHandler";
import Post from "../models/post.model";
import formidable from "formidable";
import fs from "fs";
import { PostById, RequestWithProfile } from "../types";
import { NextFunction, RequestHandler, Response } from "express";

const create = async (req: RequestWithProfile, res: Response) => {
  let form = new formidable.IncomingForm();
  form["options"].keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    let post = new Post(fields);
    post.postedBy = req.profile!;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo["filepath"]); // read the photo file
      post.photo.contentType = files.photo["mimetype"]; // get the photo mimetype
    }
    try {
      let result = await post.save();
      return res.json(result);
    } catch (error) {
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(error),
      });
    }
  });
};

const postById: PostById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate("postedBy", "_id name").exec();
    if (!post)
      return res.status(400).json({
        error: "Post not found",
      });
    req.post = post;
    next();
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const listByUser = async (req: RequestWithProfile, res: Response) => {
  try {
    let posts = await Post.find({ postedBy: req.profile!._id }) // select only the posts of the current user
      .populate("comments.postedBy", "_id name") // return user info of the commenter
      .populate("postedBy", "_id name") // return user info of the poster
      .sort("-created") // sort the posts by created date
      .exec(); // execute the query
    return res.json(posts);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const listNewsFedd = async (req: RequestWithProfile, res: Response) => {
  let following = req.profile!.following;
  following.push(req.profile!._id);
  try {
    let posts = await Post.find({ postedBy: { $in: req.profile!.following } }) // select only the posts of the users that the current user is following
      .populate("comments.postedBy", "_id name") // return user info of the commentor
      .populate("postedBy", "_id name") // return user info of the poster
      .sort("-created") // sort the posts by created date
      .exec();
    return res.json(posts);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const photo = (req: RequestWithProfile, res: Response, next: NextFunction) => {
  if (req.profile!.photo.data) {
    res.set("Content-Type", req.profile!.photo.contentType);
    return res.send(req.profile!.photo.data);
  }
  next();
};

export { listNewsFedd, listByUser, create, photo, postById };
