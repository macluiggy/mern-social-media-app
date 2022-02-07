import React from "react";
import { makeStyles } from "@material-ui/core";
import { CardContent, Card, CardMedia, Typography } from "@material-ui/core";
import unicornbikeImg from "./../assets/images/unicornbike.jpg";
import { Link } from "react-router-dom";
// const unicornbikeImg = require("./../assets/images/unicornbike.jpg");
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home() {
  const { media, card, title } = useStyles();
  return (
    <Card className={card}>
      <Typography variant="h6" className={title}>
        Home Page
      </Typography>
      <CardMedia
        className={media}
        image={unicornbikeImg}
        title="Unicorn Bicycle"
      />
      <CardContent>
        <Typography>Welcome to the MERN Skeleton home page.</Typography>
        {/* <Link to="/users">Users</Link> */}
      </CardContent>
    </Card>
  );
}
