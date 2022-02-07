import {
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Person, ArrowForward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { list } from "./api-user";

const useStyles = makeStyles(({ mixins: { gutters }, spacing, palette }) => ({
  root: gutters({
    padding: spacing(1),
    margin: spacing(5),
  }),
  title: {
    margin: `${spacing(4)}px 0 ${spacing(2)}px`,
    color: palette.common["black"],
  },
}));
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { root, title } = useStyles();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) return console.log(data.error);
      console.log(data);

      setUsers(data);
      setLoading(false);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Paper className={root}>
      <Typography variant="h6" className={title}>
        All Users
      </Typography>
      <List dense>
        {loading ? (
          <div>Loading...</div>
        ) : (
          users.map(({ _id, name }, i) => {
            return (
              <Link to={`/user/${_id}`} key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })
        )}
      </List>
    </Paper>
  );
}
