import React from "react";
import DisplayInfo from "../components/DisplayInfo";
import DisplayData from "../components/DisplayData";
import CreateCampaign from "../components/CreateCampaign";

const Explore = () => {
  return (
    <div>
      <DisplayInfo></DisplayInfo>

      <p>Test data for blockchain</p>

      <DisplayData></DisplayData>

      <CreateCampaign></CreateCampaign>
    </div>
  );
};

export default Explore;
