import React, { useState } from "react";
import { create } from "./api-user";
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

interface IUser {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
}

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
export default function Signup() {
  const { card, title, textField, submit, error } = useStyles();
  const [values, setValues] = useState<IUser>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
      email: values.email || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <div>
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" className={title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            className={textField}
            label="Name"
            onChange={handleChange("name")}
            value={values.name}
            margin="normal"
          />
          <br />
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
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
