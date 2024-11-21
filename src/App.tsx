import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";
import DisplayInfo from "./components/DisplayInfo";
import DisplayData from "./components/DisplayData";
import CreateCampaign from "./components/CreateCampaign";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CampaignDetails from "./pages/CampaignDetails";
import CreateProduct from "./pages/CreateProduct";
import DashBoard from "./pages/DashBoard";
import PurchaseTransactions from "./pages/PurchaseTransactions";
import PurchaseHistory from "./pages/PurchaseHistory";
import MyAccount from "./pages/MyAccount";
import {
  IoIosNotifications,
  IoIosNotificationsOutline,
  IoIosSettings,
} from "react-icons/io";
import { FaSearch } from "react-icons/fa";


import { navlinks } from "./constants";

export function App() {
  const location = useLocation();
  return (
    <div className="h-screen flex flex-row">
      {/* Side bar */}
      <div className="w-12p">
        <Sidebar></Sidebar>
      </div>

      {/* content */}
      <div className="flex-1">
        {/* Nav bar */}
        <div className="flex flex-row p-4 justify-between px-10 items-center">
          <div>
            {navlinks.map((link: any, index: any) => (
              <p className="text-white text-xl">
                {" "}
                {link.link == location.pathname && link.name}
              </p>
            ))}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row bg-[#3A3D45] w-[300px] h-[40px] rounded-3xl items-center pl-2">
              <FaSearch className="text-white w-[24px] h-[24px] pl-2 cursor-pointer"></FaSearch>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for anything"
                className="p-4 text-sm bg-transparent border-none outline-none focus:disabled "
              />
            </div>

            <IoIosNotificationsOutline className="text-white cursor-pointer font-bold w-[40px] h-[40px] rounded-full p-2 bg-[#3A3D45]"></IoIosNotificationsOutline>
            <IoIosSettings className="text-white cursor-pointer font-bold w-[40px] h-[40px] rounded-full p-2 bg-[#3A3D45]"></IoIosSettings>
            <ConnectButton client={client} />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/purchase-transactions/"
            element={<PurchaseTransactions />}
          />
          <Route path="/purchase-history/" element={<PurchaseHistory />} />
          <Route path="/myaccount/" element={<MyAccount />} />
        </Routes>
      </div>
    </div>
  );
}
