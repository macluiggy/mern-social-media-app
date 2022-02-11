import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { path } from "../config";
import FollowProfileButton from "./FollowProfileButton";
// import defaultPhoto from "./../assets/images/profile-pic.png";
// const defaultPhoto = require("./../assets/images/profile-pic.png");
const { isAuthenticated } = auth;

const useStyles = makeStyles(({ mixins: { gutters }, spacing, palette }) => ({
  root: gutters({
    maxWidth: 600,
    margin: "auto",
    padding: spacing(3),
    marginTop: spacing(5),
  }),
  title: {
    marginTop: spacing(3),
    col: palette.text.primary,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

type UserProps = {
  _id: string;
  name: string;
  email: string;
  created: string;
  updated: string;
  about: string;
  following: string[];
  followers: string[];
};
type ValuesProps = {
  user: UserProps;
  redirectToSignin: boolean;
  following: boolean;
};
export default function Profile({ match }) {
  const { root, title, bigAvatar } = useStyles();
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   created: "",
  //   _id: "",
  //   about: "",
  // });
  const [values, setValues] = useState<any>({
    user: {
      following: [],
      followers: [],
      name: "",
      email: "",
      created: "",
      _id: "",
      about: "",
      updated: "",
    },
    redirectToSignin: false,
    following: false,
  });
  // const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt: { token: string; user: any } = isAuthenticated()
    ? auth.returnUser()
    : { token: "" };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    // console.log(jwt);
    const t = jwt.token;
    read({ userId: match.params.userId }, { t }, signal).then((data) => {
      // console.log(data);

      if (data && data.error) {
        console.log("data error from read", data);
        setValues({ ...values, redirectToSignin: true });
      } else {
        // setUser(data);
        // console.log("data from read api call", data);
        let following = checkFollow(data);
        console.log("following:", following);
        setValues({ ...values, user: data, following: following });
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      console.log("follower:", follower);
      return follower._id == jwt.user._id;
    });
    console.log("match:", match);
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      values.user._id
    ).then((data) => {
      console.log("data from clickFollowButton", data);
      if (data.error) {
        console.log("data error from callApi", data);
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  const photoUrl = values.user._id
    ? `${path}/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "";
  if (values.redirectToSignin) return <Redirect to="/signin" />;
  console.log(photoUrl);
  return (
    <Paper className={root}>
      <Typography variant="h6" className={title}>
        Profile
      </Typography>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={bigAvatar} />
            </ListItemAvatar>
            <ListItemText
              primary={values.user.name}
              secondary={values.user.email}
            />{" "}
            {auth.returnUser().user &&
            auth.returnUser().user._id == values.user._id ? (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${values.user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={values.user._id} />
              </ListItemSecondaryAction>
            ) : (
              <FollowProfileButton
                following={values.following}
                onButtonClick={clickFollowButton}
              />
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={values.user.about}
              secondary={`Joined: ${new Date(
                values.user.created || ""
              ).toDateString()}`}
            />
          </ListItem>
        </List>
      )}
    </Paper>
  );
}
