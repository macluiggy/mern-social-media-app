import { ChangeEvent } from "react";

export type TRead = (
  params: { userId: string },
  credentials: { t: string | boolean },
  signal: AbortSignal
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: string;
  error?: any;
}>;

export type TUpdate = (
  params: { userId: string },
  credentials: { t: string },
  user: {
    name: string;
    email: string;
    password: string;
  }
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: Date | undefined;
  updated: Date | undefined;
  error?: any;
}>;

export type TRemove = (
  params: { userId: string },
  credentials: { t: string }
) => Promise<{
  message: string;
  deletedUser: {
    _id: string;
    name: string;
    email: string;
    created: string;
  };
  error?: any;
}>;
export type THandleChange = (
  name: string
) => (event: ChangeEvent<HTMLTextAreaElement>) => void;
