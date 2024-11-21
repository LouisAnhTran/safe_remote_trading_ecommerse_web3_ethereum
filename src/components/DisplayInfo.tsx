import React from "react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "../client";
import { Chain } from "thirdweb/chains";
import { defineChain } from "thirdweb/chains";
import { sepolia } from "thirdweb/chains";

const DisplayInfo = () => {
  const account = useActiveAccount();

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });

  return (
    <div>
       <p>Wallet address: {account?.address}</p>
      <p>
        Wallet balance: {balance?.displayValue} {balance?.symbol}
      </p>
    </div>
  );
};

export default DisplayInfo;
