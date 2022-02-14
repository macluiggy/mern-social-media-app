import React from "react";
import Post from "./Post";

const PostList = ({ posts, removeUpdate }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {posts.map((item, i) => {
        return <Post key={i} post={item} onRemove={removeUpdate} />;
      })}
    </div>
  );
};

export default PostList;
