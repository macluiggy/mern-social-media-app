import React, { useState } from "react";
import { AppBar, Typography, Tabs, Tab } from "@material-ui/core";
import FollowGrid from "./FollowGrid";
import PostList from "../post/PostList";

const ProfileTabs = ({ removePostUpdate, user, posts }) => {
  console.log(posts, "from profiletabs");
  const [tab, setTab] = useState(0);

  const handleChange = (event, value) => {
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
            <PostList removeUpdate={removePostUpdate} posts={posts} />
          </TabContainer>
        )}
        {tab === 1 && (
          <TabContainer>
            <FollowGrid people={user.following} />
          </TabContainer>
        )}
        {tab === 2 && (
          <TabContainer>
            <FollowGrid people={user.followers} />
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
