import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import { signin } from "../auth/api-auth";
import { Redirect } from "react-router-dom";
import { THandleChange } from "./types";

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
type TValues = {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
  redirectToProfile: boolean;
  userId?: string;
};
export default function EditProfile({ match }) {
  const { card, title, textField, submit, error } = useStyles();
  const [values, setValues] = useState<TValues>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });
  const jwt: { token: string } = auth.isAuthenticated()
    ? auth.returnUser()
    : { token: "" };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        const { error, email, name } = data;
        if (data && error) {
          setValues({ ...values, error });
        } else {
          setValues({ ...values, name, email });
        }
      }
    );
    //
    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    update({ userId: match.params.userId }, { t: jwt.token }, user).then(
      (data) => {
        const { error, _id: userId } = data;
        if (data && error) {
          // console.log("an error occured");
          setValues({ ...values, error });
        } else {
          // console.log("user updated");
          setValues({
            ...values,
            redirectToProfile: true,
            userId,
          });
        }
      }
    );
  };

  const handleChange: THandleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  if (values.redirectToProfile)
    return <Redirect to={`/user/${values.userId}`} />;
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={title}>
          Edit Profile
        </Typography>
        <TextField
          id="name"
          label="Name"
          className={textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          className={textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={textField}
          value={values.password}
          onChange={handleChange("password")}
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
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
