import { path } from "../config";
import type { SigninProps } from "./types";

const signin: SigninProps = async (user) => {
  console.log(user);
  try {
    const response = await fetch(`${path}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const signout = async () => {
  try {
    const response = await fetch(`${path}/auth/signout`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { signin, signout };
