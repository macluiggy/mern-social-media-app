import { path } from "../config";
import {
  Comment,
  Create,
  Like,
  ListByUser,
  ListNewsFedd,
  Remove,
  Uncomment,
  Unlike,
} from "./types";

const create: Create = async (params, credentials, post) => {
  try {
    let response = await fetch(`${path}/api/posts/new/${params.userId}`, {
      method: "POST",
      headers: {
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
    console.log(data, "from  listByUser");
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
const like: Like = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${path}/api/posts/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId }),
    });
    let data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const unlike: Unlike = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${path}/api/posts/unlike`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId }),
    });
    let data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const comment: Comment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${path}/api/posts/comment/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId, comment }),
    });
    const data = await response.json();
    console.log(data, "from comment");
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const uncomment: Uncomment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${path}/api/posts/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId, comment }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export {
  listNewsFedd,
  listByUser,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
