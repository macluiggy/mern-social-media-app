import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Card, Typography, Divider } from "@material-ui/core";
import auth from "../auth/auth-helper";
import PostList from "./PostList";
import NewPost from "./NewPost";
import { listNewsFedd } from "./api-post";
import { RemovePost } from "./types";

const useStyles = makeStyles((theme: any) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
}));

const Newsfeed = ({ size }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState<any[]>([]);
  const jwt = auth.returnUser();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listNewsFedd({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setPosts(data);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const removePost: RemovePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };
  return (
    <Card
      className={classes.card}
      style={{
        width: size > 600 ? "100%" : "100vw",
      }}
    >
      <Typography className={classes.title}>News Feed</Typography>
      <Divider />
      <NewPost addUpdate={addPost} />
      <Divider />
      <PostList posts={posts} removeUpdate={removePost} />
    </Card>
  );
};

export default Newsfeed;
