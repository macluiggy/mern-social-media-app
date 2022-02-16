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
  comments: {
    text: string;
    created: Date;
    postedBy: { _id: string; name: string };
  }[];
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

export type Like = (
  paramsxd: { userId: string },
  credentials: { t: string },
  postId: string
) => Promise<Post>;

export type Unlike = Like;

export type RemovePost = (post: Post) => void;

export type PostPopulated = {
  _id: string;
  text: string;
  photo: {
    data: BinaryData;
    contentType: string;
  };
  likes: string[];
  comments: Array<{
    text: string;
    created: Date;
    postedBy: { _id: string; name: string };
  }>;
  postedBy: { _id: string; name: string };
  created: Date;
  error?: any;
};

export type Comment = (
  paramsxd: { userId: string },
  credentials: { t: string },
  postId: string,
  comment: { text: string }
) => Promise<PostPopulated>;

export type Uncomment = (
  paramsxd: { userId: string },
  credentials: { t: string },
  postId: string,
  comment: any
) => Promise<PostPopulated>;

export type CheckLike = (likes: string[]) => boolean;

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type DeleteComment = (comment: {
  text: string;
}) => (event: React.MouseEventHandler<HTMLSpanElement>) => void;

export type AddComment = (
  e: React.KeyboardEvent<HTMLDivElement> &
    React.ChangeEvent<HTMLTextAreaElement>
) => void;

export type UpdateComments = (comments: Post["comments"]) => void;

export type CommentBody = (item: Post["comments"][0]) => JSX.Element;

export type AddPost = (post: Post) => void;
