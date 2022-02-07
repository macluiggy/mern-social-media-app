import React, { useState } from "react";
import { signin } from "./api-auth";
import auth from "./auth-helper";
import { Redirect } from "react-router-dom";
import {
  Card,
  Typography,
  TextField,
  CardContent,
  CardActions,
  Button,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { iUserSignIn } from "./types";

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: spacing(5),
    paddingBottom: spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: spacing(2),
    color: palette.primary.main,
  },
  textField: {
    marginLeft: spacing(1),
    marginRight: spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: spacing(2),
  },
}));

export default function Signin(props) {
  const { textField, submit, error, title, card } = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data: iUserSignIn) => {
      // console.log(data, "from signin");

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const { from } = props.location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) return <Redirect to={from} />;
  return (
    <div>
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" className={title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            className={textField}
            label="Email"
            onChange={handleChange("email")}
            value={values.email}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            className={textField}
            label="Password"
            onChange={handleChange("password")}
            value={values.password}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
