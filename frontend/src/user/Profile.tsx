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
}));

export default function Profile({ match }) {
  const { root, title } = useStyles();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    created: "",
    _id: "",
  });
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt: { token: string } = isAuthenticated()
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
        setRedirectToSignin(true);
      } else {
        setUser(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) return <Redirect to="/signin" />;

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
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />{" "}
            {auth.returnUser().user && auth.returnUser().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Joined: ${new Date(user.created || "").toDateString()}`}
            />
          </ListItem>
        </List>
      )}
    </Paper>
  );
}
