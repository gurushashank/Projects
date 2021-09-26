// Author : Jaahnvi Hehar
// This file contains tabs for the User Profile - Profile, Address and Card
import React from "react";
import { Container, Tab } from "./TabElements";

//Set active tab on click
const Tabs = ({ activeTab, setTab }) => {
  return (
    <div>
      <Container>
        <Tab to="/profile" onClick={setTab} active={activeTab === 1 ? 1 : 0}>
          Profile
        </Tab>
        <Tab to="/address" onClick={setTab} active={activeTab === 2 ? 1 : 0}>
          Address
        </Tab>
        <Tab to="/card" onClick={setTab} active={activeTab === 3 ? 1 : 0}>
          Card
        </Tab>
      </Container>
    </div>
  );
};

export default Tabs;
