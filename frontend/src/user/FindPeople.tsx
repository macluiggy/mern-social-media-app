import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Visibility as ViewIcon } from "@material-ui/icons";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./api-user";
import { ClickFollow, User } from "./types";

const useStyles = makeStyles((theme: any) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.openTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

const FindPeople = ({ size }) => {
  const classes = useStyles();
  const [values, setValues] = useState<{
    users: User[];
    open: boolean;
    followMessage: string;
  }>({
    users: [],
    open: false,
    followMessage: "",
  });
  const jwt = auth.returnUser();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    findPeople({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data: any) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, users: data });
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const clickFollow: ClickFollow = (user, index) => {
    follow(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      user._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let toFollow = [...values.users];
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`,
        });
      }
    });
  };

  const handleRequestClose = (event: any, reason: any) => {
    setValues({ ...values, open: false });
  };

  return (
    <div
      style={{
        overflowY: size < 600 ? "scroll" : "visible",
        maxHeight: "400px",
        width: size > 600 ? "100%" : "100vw",
      }}
    >
      <Paper className={classes.root} elevation={4}>
        <Typography title="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {values.users.map((item, i) => {
            // console.log(item);
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={`/api/users/photo/${item._id}`} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={`/user/${item._id}`}>
                      <IconButton
                        color="secondary"
                        className={classes.viewButton}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => clickFollow(item, i)}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={
            <span className={classes.snack}>{values.followMessage}</span>
          }
        />
      </Paper>
    </div>
  );
};

export default FindPeople;
