import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import "./index.css";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: "07a04bf170c7417ab25d95b0cefc79c8",
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xf8450a9027f6Ec3CeE529DDEdf9fbA2A07e0334b",
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ThirdwebProvider>
        <Toaster />
        <App />
      </ThirdwebProvider>
    </Router>
  </React.StrictMode>
);
