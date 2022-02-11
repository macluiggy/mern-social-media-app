import { ChangeEvent, FieldsetHTMLAttributes, SyntheticEvent } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  created: string;
  error?: any;
  about?: string;
  following: string[];
  followers: Array<{ _id: string; name: string }>;
};

export type CreateApiCallProps = (user: {
  name: string;
  email: string;
  password: string;
}) => Promise<{ message: string; newUser: User; error: any }>;

export type TRead = (
  params: { userId: string },
  credentials: { t: string | boolean },
  signal: AbortSignal
) => Promise<User>;

export type TUpdate = (
  params: { userId: string },
  credentials: { t: string },
  user: FormData
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
interface Files {
  files: any[];
}
export type THandleChange = (
  name: string
) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>) => void;

export type CallApiProps = (
  params: { userId: string },
  credentials: { t: string },
  followOrUnfollowId: string
) => Promise<{
  following: string[];
  followers: string[];
  _id: string;
  name: string;
  email: string;
  created: string;
  error: any;
}>;

export type CheckFollowProps = (user: User) => boolean;
