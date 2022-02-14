import React from "react";
import type { FC } from "react";

const Post: FC<{ post: any; removeUpdate: Function }> = ({
  post,
  removeUpdate,
}) => {
  return <div>Post</div>;
};

export default Post;
