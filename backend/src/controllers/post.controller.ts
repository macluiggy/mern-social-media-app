import dbErrorHandler from "../helpers/dbErrorHandler";
import Post from "../models/post.model";
import formidable from "formidable";
import fs from "fs";
import { RequestWithAuth, RequestWithPost, RequestWithProfile } from "../types";
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

const postById = async (
  req: RequestWithPost,
  res: Response,
  next: NextFunction,
  id: string
) => {
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

const remove = async (req: RequestWithPost, res: Response) => {
  let post = req.post;
  try {
    let deletedPost = await post!.remove();
    return res.json(deletedPost);
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

const like: RequestHandler = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.body.userId },
      },
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const unlike: RequestHandler = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body.userId },
      },
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const isPoster = (
  req: RequestWithPost & RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster)
    return res.status(403).json({
      error: "User is not authorized",
    });
  next();
};

const comment: RequestHandler = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  console.log(comment);
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name") // from postedBy change its value to and object containing its _id and name
      .populate("postedBy", "_id name") // add from postedBy with the id that contains, return the User with that id and add its name and _id to replace its value
      .exec();
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const uncomment: RequestHandler = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name") // from postedBy change its value to and object containing its _id and name
      .populate("postedBy", "_id name") // add from postedBy with the id that contains, return the User with that id and add its name and _id to replace its value
      .exec();
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

export {
  listNewsFedd,
  listByUser,
  create,
  photo,
  postById,
  isPoster,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
