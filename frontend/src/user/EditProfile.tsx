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
import { AddPhotoAlternate as FileUpload } from "@material-ui/icons";
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
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
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
  about: string;
  photo?: any;
};
export default function EditProfile({ match }) {
  const { card, title, textField, submit, error, input, filename } =
    useStyles();
  const [values, setValues] = useState<TValues>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
    about: "",
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
      about: values.about,
    };
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

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
    const target = event.target as HTMLInputElement;
    let file: File = (target.files as FileList)[0];
    let value = name === "photo" ? file : target.value;
    setValues({ ...values, error: "", [name]: value });
  };

  if (values.redirectToProfile)
    return <Redirect to={`/user/${values.userId}`} />;
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={title}>
          Edit Profile
        </Typography>
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          className={input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload <FileUpload />
          </Button>
        </label>
        <span className={filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        <br />
        <TextField
          id="name"
          label="Name"
          className={textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          id="multiline-flexible"
          label="About"
          multiline
          rows="2"
          value={values.about}
          onChange={handleChange("about")}
          className={textField}
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
