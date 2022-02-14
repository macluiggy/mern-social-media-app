import { User } from "../user/types";

export type ListNewsFedd = (
  params: { userId: string },
  credentials: { t: string | boolean },
  signal: AbortSignal
) => Promise<any>;

export type ListByUser = (
  params: { userId: string },
  credentials: { t: string | boolean }
) => Promise<any>;

export type Post = {
  text: string;
  photo: {
    data: BinaryData;
    contentType: string;
  };
  likes: number;
  comments: string;
  postedBy: User;
  created: Date;
};

export type Create = (
  params: { userId: string },
  credentials: { t: string | boolean },
  post: (Post & BodyInit) | FormData
) => Promise<any>;
