import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import React from "react";
import { withRouter, Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const isActive = (
  history: { location: { pathname: string } },
  path: string
) => {
  // if current path from history.location is equal to the path we are checking
  if (history.location.pathname === path) {
    return { color: "#f50057" }; // change to active color
  } else {
    return { color: "#ffffff" }; // otherwise default color
  }
};
export const Menu = withRouter(({ history }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={`/user/${auth.returnUser().user._id}`}>
              <Button
                style={isActive(history, `/user/${auth.returnUser().user._id}`)}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => history.push("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});
