import React, { FC, useState } from "react";
import auth from "../auth/auth-helper";
import {
  CardHeader,
  TextField,
  Avatar,
  Icon,
  makeStyles,
} from "@material-ui/core";
import { comment, uncomment } from "./api-post";
import { Link } from "react-router-dom";
import {
  AddComment,
  CommentBody,
  DeleteComment,
  HandleChange,
  Post,
  UpdateComments,
} from "./types";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

type CommentsProps = {
  postId: string;
  comments: Post["comments"];
  updateComments: UpdateComments;
};
const Comments: FC<CommentsProps> = ({ postId, comments, updateComments }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const jwt = auth.returnUser();
  const handleChange: HandleChange = (event) => {
    setText(event.target.value);
  };

  const addComment: AddComment = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      console.log(jwt, postId, text);
      comment({ userId: jwt.user._id }, { t: jwt.token }, postId, {
        text,
      }).then((data) => {
        if (data.error) {
          console.log(data.error, "from addcoment method");
        } else {
          setText("");
          updateComments(data.comments);
        }
      });
    }
  };

  const deleteComment: DeleteComment = (comment) => (event) => {
    uncomment({ userId: jwt.user._id }, { t: jwt.token }, postId, comment).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateComments(data.comments);
        }
      }
    );
  };

  const commentBody: CommentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {auth.returnUser().user._id === item.postedBy._id && (
            <Icon
              onClick={() => deleteComment(item)}
              className={classes.commentDelete}
            >
              delete
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={"/api/users/photo/" + auth.returnUser().user._id}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {comments.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={"/api/users/photo/" + item.postedBy._id}
              />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={item.postedBy._id}
          />
        );
      })}
    </div>
  );
};

export default Comments;
