import React from "react";
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
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import { Post } from "./types";

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

type PostProps = { post: Post; removeUpdate: Function };
const Post: FC<PostProps> = ({ post, removeUpdate }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={`/api/users/photo/${post.postedBy._id}`} />}
        action={
          post.postedBy._id === auth.returnUser().user._id && (
            <IconButton onClick={() =>}>
              <DeleteIcon />
            </IconButton>
          )
        }
        
      />
    </Card>
  );
};

export default Post;
