// Author : Jaahnvi Hehar
//This page is for the address details of User Profile
import React from "react";
import Tabs from "../Components/Tab/Tabs";
import { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import AddressDetails from "../Components/ProfileContent/AddressDetails";

const Address = () => {
  const [activeTab, setActiveTab] = useState(2);

  //Set tab to Address
  const setTab = () => {
    setActiveTab(2);
  };

  return (
    <div>
      <Navbar />
      <Tabs activeTab={activeTab} setTab={setTab} />
      <AddressDetails />
      <Footer />
    </div>
  );
};

export default Address;
