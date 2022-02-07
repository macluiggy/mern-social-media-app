import { path } from "../config";
import { TRead, TRemove, TUpdate } from "./types";
const create = async (user) => {
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
  } catch (error) {
    console.log(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch(`${path}/api/users`, {
      method: "GET",
      signal: signal, // cancel request if signal is canceled
    });
    return await response.json();
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

const update: TUpdate = async (params, credentials, user) => {
  try {
    let response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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

export { create, list, read, update, remove };
