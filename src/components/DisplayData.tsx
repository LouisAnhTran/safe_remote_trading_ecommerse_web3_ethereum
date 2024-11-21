import React from "react";
import { contract } from "../main";
import { useReadContract } from "thirdweb/react";

const DisplayData = () => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])",
    params: [],
  });

  console.log("data: ", data);

  return (
    <div>
      {isPending && "is loading"}
      DisplayData
      {data &&
        data.map((item: any, index: any) => (
          <>
            <div key={index}>
              {item.owner}
              {item.description}
            </div>
          </>
        ))}
    </div>
  );
};

export default DisplayData;
