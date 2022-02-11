import React, { FC } from "react";
import { Button } from "@material-ui/core";
import { follow, unfollow } from "./api-user";

type FollowProfileButtonProps = {
  onButtonClick: any;
};
const FollowProfileButton: FC<FollowProfileButtonProps> = ({
  onButtonClick,
  following,
}) => {
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
};

export default FollowProfileButton;
