// Author : Jaahnvi Hehar
//This page is for the profile details of User Profile
import React from "react";
import Tabs from "../Components/Tab/Tabs";
import { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import ProfileDetails from "../Components/ProfileContent/ProfileDetails";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);

  //Set tab to Profile
  const setTab = () => {
    setActiveTab(1);
  };

  return (
    <div>
      <Navbar />
      <Tabs activeTab={activeTab} setTab={setTab} />
      <ProfileDetails />
      <Footer />
    </div>
  );
};

export default Profile;
