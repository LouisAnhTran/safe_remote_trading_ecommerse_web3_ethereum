import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { store } from "./app/store";
import { Provider } from "react-redux";

import "./index.css";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";


console.log("test .env file",import.meta.env.VITE_TEMPLATE_CLIENT_ID); // Logs: MyViteApp
console.log("test .env file",import.meta.env.VITE_CONTRACT_ADDRESSS); // Logs: MyViteApp

const clientID=import.meta.env.VITE_TEMPLATE_CLIENT_ID;
const contractAddress=import.meta.env.VITE_CONTRACT_ADDRESSS;


// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: clientID,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: contractAddress,
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThirdwebProvider>
          <Toaster />
          <App />
        </ThirdwebProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
