import React, { FC, useState } from "react";
import {
  AppBar,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from "@material-ui/core";
import FollowGrid from "./FollowGrid";
import PostList from "../post/PostList";
import { HandleChange, User } from "./types";
import { Post } from "../post/types";

type ProfileTabsProps = {
  removePostUpdate: any;
  user: User;
  posts: Post[];
  loading: boolean;
};
const ProfileTabs: FC<ProfileTabsProps> = ({
  removePostUpdate,
  user,
  posts,
  loading,
}) => {
  console.log(posts, "from profiletabs");
  const [tab, setTab] = useState(0);
  const handleChange: HandleChange = (event, value) => {
    setTab(value);
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
        {tab === 0 && (
          <TabContainer>
            {loading ? (
              <CircularProgress style={{ position: "relative", left: "45%" }} />
            ) : (
              <PostList removeUpdate={removePostUpdate} posts={posts} />
            )}
          </TabContainer>
        )}
        {tab === 1 && (
          <TabContainer>
            {loading ? (
              <CircularProgress style={{ position: "relative", left: "45%" }} />
            ) : (
              <FollowGrid people={user.following} />
            )}
          </TabContainer>
        )}
        {tab === 2 && (
          <TabContainer>
            {loading ? (
              <CircularProgress style={{ position: "relative", left: "45%" }} />
            ) : (
              <FollowGrid people={user.followers} />
            )}
          </TabContainer>
        )}
      </AppBar>
    </div>
  );
};

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

export default ProfileTabs;
