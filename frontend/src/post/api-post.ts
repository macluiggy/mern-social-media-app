import { path } from "../config";
import { Create, ListByUser, ListNewsFedd, Remove } from "./types";

const create: Create = async (params, credentials, post) => {
  try {
    let response = await fetch(`${path}/api/posts/new/${params.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: post,
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const listByUser: ListByUser = async (params, credentials) => {
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

const remove: Remove = async (params, credentials) => {
  try {
    let response = await fetch(`${path}/api/posts/${params.postId}`, {
      method: "DELETE",
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

export { listNewsFedd, listByUser, create, remove };
