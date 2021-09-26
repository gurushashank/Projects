// Author : Jaahnvi Hehar
//This page is for the card details of User Profile
import React from "react";
import Tabs from "../Components/Tab/Tabs";
import { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import CardDetails from "../Components/ProfileContent/CardDetails";

const Card = () => {
  const [activeTab, setActiveTab] = useState(3);

  //Set tab to Card
  const setTab = () => {
    setActiveTab(3);
  };

  return (
    <div>
      <Navbar />
      <Tabs activeTab={activeTab} setTab={setTab} />
      <CardDetails />
      <Footer />
    </div>
  );
};

export default Card;
