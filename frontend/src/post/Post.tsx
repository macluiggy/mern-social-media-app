import React, { useState } from "react";
import type { FC } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import { CheckLike, Post, PostPopulated, UpdateComments } from "./types";
import Comments from "./Comments";
import { like, remove, unlike } from "./api-post";
import { path } from "../config";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

type PostProps = { post: PostPopulated; onRemove: Function };
const Post: FC<PostProps> = ({ post, onRemove }) => {
  const classes = useStyles();
  const jwt = auth.returnUser();
  const checkLike: CheckLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(post.likes),
    likes: post.likes.length,
    comments: post.comments,
  });

  const clickLike = () => {
    let callApi = values.like ? unlike : like;
    callApi({ userId: jwt.user._id }, { t: jwt.token }, post._id).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            like: !values.like,
            likes: data.likes.length,
          });
        }
      }
    );
  };

  const updateComments: UpdateComments = (comments) => {
    setValues({ ...values, comments });
  };

  const deletePost = () => {
    remove({ postId: post._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        onRemove(post);
      }
    });
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={`${path}/api/users/photo/${post.postedBy._id}`} />}
        action={
          post.postedBy._id === auth.returnUser().user._id && (
            <IconButton onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
        }
        subheader={new Date(post.created).toDateString()}
        className={classes.cardHeader}
      />

      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {post.text}
        </Typography>
        {post.photo && (
          <div className={classes.photo}>
            <img src={`${path}/api/posts/photo/${post._id}`} alt="photo" />
          </div>
        )}
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Like"
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Unlike"
            color="secondary"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}{" "}
        <span>{values.likes}</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>
        <span>{values.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments
        postId={post._id}
        comments={values.comments}
        updateComments={updateComments}
      />
    </Card>
  );
};

export default Post;
