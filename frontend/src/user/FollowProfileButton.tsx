import React from "react";
import { Button } from "@material-ui/core";
import { follow, unfollow } from "./api-user";

export default function FollowProfileButton({ onButtonClick, following }) {
  const followClick = () => {
    onButtonClick(follow);
  };
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };
  return (
    <div>
      {following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
}
