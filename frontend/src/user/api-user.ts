import { path } from "../config";
import {
  CallApiProps,
  FindPeople,
  TRead,
  TRemove,
  TUpdate,
  User,
} from "./types";
import type { CreateApiCallProps } from "./types";

const create: CreateApiCallProps = async (user) => {
  try {
    let response = await fetch(`${path}/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
type ListApiCallProps = (signal: AbortSignal) => Promise<User[]>;
const list: ListApiCallProps = async (signal) => {
  try {
    let response = await fetch(`${path}/api/users`, {
      method: "GET",
      signal: signal, // cancel request if signal is canceled
    });
    return await response.json();
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const read: TRead = async (params, credentials, signal) => {
  // console.log(path);
  try {
    // console.log(credentials.t);

    let response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "GET",
      signal: signal, // cancel request if signal is canceled
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    let data = await response.json();
    // console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const update: TUpdate = async (params, credentials, user) => {
  try {
    let response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "PUT",
      body: user,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const remove: TRemove = async (params, credentials) => {
  try {
    const response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

const follow: CallApiProps = async (params, credentials, followId) => {
  try {
    let response = await fetch(`${path}/api/users/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, followId: followId }),
    });
    const data = await response.json();
    console.log("following", data);
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const unfollow: CallApiProps = async (params, credentials, unfollowId) => {
  try {
    const response = await fetch(`${path}/api/users/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, unfollowId: unfollowId }),
    });
    const data = await response.json();
    console.log("unfollowing:", data);
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

const findPeople: FindPeople = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${path}/api/users/findPeople/${params.userId}`,
      {
        method: "GET",
        signal: signal, // cancel request if signal is canceled
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
          // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
        },
      }
    );
    const data = await response.json();
    console.log("findPeople:", data);
    return data;
  } catch (error: any) {
    return { error: error.message };
  }
};
export { create, list, read, update, remove, follow, unfollow, findPeople };
