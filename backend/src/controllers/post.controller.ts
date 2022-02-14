import dbErrorHandler from "../helpers/dbErrorHandler";
import Post from "../models/post.model";
import formidable from "formidable";
import fs from "fs";
import { RequestWithProfile } from "../types";
import { Response } from "express";

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

export { listNewsFedd, listByUser };
