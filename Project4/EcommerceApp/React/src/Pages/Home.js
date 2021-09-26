import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import VideoLoop from "../Components/VideoLoop/VideoLoop";
import ShopNow from "../Components/ShopNow/ShopNow";
import ExploreNow from "../Components/ExploreNow/ExploreNow";
import About from "../Components/About/About";
import Susbcribe from "../Components/Subscribe/Susbcribe";

function Home() {
  return (
    <div>
      <Navbar />
      <VideoLoop />
      <br />
      <br />
      <About />
      <br />
      <ExploreNow />
      <br />
      <ShopNow />
      <br />
      <Susbcribe />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Home;
