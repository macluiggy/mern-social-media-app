import React from "react";
import type { FC } from "react";
import Post from "./Post";
import type { Post as PostProps, PostPopulated, RemovePost } from "./types";

type PostListProps = {
  posts: PostPopulated[];
  removeUpdate: RemovePost;
};

const PostList: FC<PostListProps> = ({ posts, removeUpdate }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {posts.map((item, i) => {
        return <Post key={i} post={item} onRemove={removeUpdate} />;
      })}
    </div>
  );
};

export default PostList;
