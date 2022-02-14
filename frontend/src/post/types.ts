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
  _id: string;
  text: string;
  photo: {
    data: BinaryData;
    contentType: string;
  };
  likes: string[];
  comments: string;
  postedBy: User;
  created: Date;
  error?: any;
};

export type Create = (
  params: { userId: string },
  credentials: { t: string | boolean },
  post: (Post & BodyInit) | FormData
) => Promise<Post>;

export type Remove = (
  params: { postId: string },
  credentials: { t: string | boolean }
) => Promise<Post>;
