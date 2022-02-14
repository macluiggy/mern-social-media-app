import { ChangeEvent, FieldsetHTMLAttributes, SyntheticEvent } from "react";

export type Follow = { _id: string; name: string };
export type User = {
  _id: string;
  name: string;
  email: string;
  created: string;
  error?: any;
  about?: string;
  updated?: string;
  following: Follow[];
  followers: Array<Follow>;
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
// interface Files {
//   files: any[];
// }
export type THandleChange = (
  name: string
) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>) => void;

export type CallApiProps = (
  params: { userId: string },
  credentials: { t: string },
  followOrUnfollowId: string
) => Promise<User>;

export type FindPeople = (
  params: { userId: string },
  credentials: { t: string | boolean },
  signal: AbortSignal
) => Promise<User[]>;

export type CheckFollowProps = (user: User) => boolean;

export type ClickFollow = (user: User, index: number) => void;
