import React, { FC, useEffect, useState } from "react";
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
import { CallApiProps, CheckFollowProps, LoadPosts, User } from "./types";
import FollowGrid from "./FollowGrid";
import { listByUser } from "../post/api-post";
import ProfileTabs from "./ProfileTabs";
// import defaultPhoto from "./../assets/images/profile-pic.png";
// const defaultPhoto = require("./../assets/images/profile-pic.png");
// const { isAuthenticated } = auth;

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
  user: User;
  redirectToSignin: boolean;
  following: boolean;
  error: string;
};

type ProfileProps = {
  match: { params: { userId: string } };
};
const Profile: FC<ProfileProps> = ({ match }) => {
  const { root, title, bigAvatar } = useStyles();
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   created: "",
  //   _id: "",
  //   about: "",
  // });
  const [values, setValues] = useState<ValuesProps>({
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
    error: "",
  });
  const [posts, setPosts] = useState<any[]>([]);
  // const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.returnUser();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    // console.log(jwt);
    const t = jwt.token as string;
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
        loadPosts(data._id);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow: CheckFollowProps = (user) => {
    const match = user.followers.some((follower) => {
      console.log("follower:", follower);
      return follower._id == jwt.user._id;
    });
    console.log("match:", match);
    return match;
  };
  type ClickFollowButtonProps = (callApi: CallApiProps) => void;
  const clickFollowButton: ClickFollowButtonProps = (callApi) => {
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

  const loadPosts: LoadPosts = (user) => {
    listByUser({ userId: user }, { t: jwt.token }).then((data) => {
      console.log("data from loadPosts", data);
      if (data.error) {
        console.log("data error from loadPosts", data.error);
        // setValues({ ...values, error: data.error });
      } else {
        setPosts(data);
      }
    });
  };
  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
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
          {/* <FollowGrid people={values.user.following} /> */}
        </List>
      )}
      <ProfileTabs
        user={values.user}
        posts={posts}
        removePostUpdate={removePost}
      />
    </Paper>
  );
};

export default Profile;
