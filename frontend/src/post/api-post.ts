import { path } from "../config";
import { ListNewsFedd } from "./types";

const listByUser = async (params, credentials) => {
  try {
    let response = await fetch(`${path}/api/posts/by/${params.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const listNewsFedd: ListNewsFedd = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${path}/api/posts/feed/${params.userId}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export { listNewsFedd, listByUser };
