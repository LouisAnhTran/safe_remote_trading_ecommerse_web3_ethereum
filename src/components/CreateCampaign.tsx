import React from "react";
import { contract } from "../main";
import { ClaimButton, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";

const CreateCampaign = () => {
  const { mutate: sendTransaction } = useSendTransaction();

  const handleOnclick = async () => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
        params: [
          "0x8147EB5B33D8894293cdA3169aDcb48F0064f9BC", // Valid owner address
          "Campaign Title", // Title
          "This is a test campaign", // Description
          BigInt(1000000000000000000), // Target (e.g., 1 ETH in Wei)
          BigInt(Math.floor(Date.now() / 1000) + 3600), // Deadline (1 hour from now as a timestamp)
          "https://example.com/image.png", // Image URL
        ],
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => console.log("Transaction success:", result),
        onError: (error) => console.error("Transaction failed:", error),
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
    }
  };

  return (
    <div>
      <button onClick={handleOnclick}>Click to Create Campaign</button>
    </div>
  );
};

export default CreateCampaign;
