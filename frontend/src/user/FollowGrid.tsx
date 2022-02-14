import React from "react";
import type { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, GridList, GridListTile } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Follow, User } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
  },
}));

const FollowGrid: FC<{ people: Follow[] }> = ({ people }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {people.map((person, i) => {
          return (
            <GridListTile style={{ height: 120 }} key={i}>
              <Link to={`/user/${person._id}`}>
                <Avatar
                  src={`/api/users/photo/${person._id}`}
                  className={classes.bigAvatar}
                />
                <Typography className={classes.tileText}>
                  {person.name}
                </Typography>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default FollowGrid;
