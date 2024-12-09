import {
  ConnectButton,
  useActiveAccount,
  useContractEvents,
} from "thirdweb/react";
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
import PurchaseTransactions from "./pages/BuyerTransactions";
import PurchaseHistory from "./pages/PurchaseHistory";
import MyAccount from "./pages/MyAccount";
import {
  IoIosNotifications,
  IoIosNotificationsOutline,
  IoIosSettings,
} from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactLoading from "react-loading";

import { navlinks } from "./constants";
import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";
import { prepareEvent } from "thirdweb";

import { contract } from "./main";
import BuyerTransactions from "./pages/BuyerTransactions";
import SellerTransactions from "./pages/SellerTransactions";
import { Button } from "./components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingState } from "./features/load/loadSlice";
import { useToast } from "./hooks/use-toast";
import { useEffect, useRef } from "react";

// handle event
const preparedEvenPurchaseCreated = prepareEvent({
  signature:
    "event PurchaseCreated(uint256 indexed purchaseId, address indexed buyer, address indexed seller, uint256 productId, uint256 quantity, uint8 status)",
});

const preparedEventSellerAcknowledgePurchase = prepareEvent({
  signature:
    "event SellerAcknowledgePurchase(uint256 purchaseID, address buyerAddress)",
});

const preparedEventBuyerConfirmPurchase = prepareEvent({
  signature:
    "event BuyerConfirmPurchase(uint256 purchaseID, address sellerAddress)",
});

const preparedEventBuyerConfirmReceivingProduct = prepareEvent({
  signature:
    "event BuyerConfirmReceivingProduct(uint256 purchaseID, address sellerAddress)",
});

export function App() {
  const location = useLocation();
  const isLoadingGlobal = useSelector(getLoadingState);
  const dispatch = useDispatch();
  const account = useActiveAccount();
  const { toast } = useToast();

  // Handle all events
  const { data: events } = useContractEvents({
    contract,
    events: [preparedEvenPurchaseCreated,preparedEventSellerAcknowledgePurchase,preparedEventBuyerConfirmPurchase,preparedEventBuyerConfirmReceivingProduct],
  });

  useEffect(() => {
    if (events && account) {
      console.log("event: ", events);

      const last_event=events[events.length-1];

      if (last_event.eventName == "PurchaseCreated" && last_event.args.seller==account.address) {
        toast({
          title: "Succesesful transaction",
          description: "Someone showed interest to buy your product id "+last_event.args.productId,
          variant: "success",
        });
      } else if (last_event.eventName=="SellerAcknowledgePurchase" && last_event.args.buyerAddress==account.address) {
        toast({
          title: "Succesesful transaction",
          description: "Seller has acknowledged the your interest to buy product with purchase id "+last_event.args.purchaseID+" and made the deposit",
          variant: "success",
        });
      } else if (last_event.eventName=="BuyerConfirmPurchase" && last_event.args.sellerAddress==account.address) {
        toast({
          title: "Succesesful transaction",
          description: "Buyer has confirmed purchase and made the deposits for purchase id "+last_event.args.purchaseID,
          variant: "success",
        });
      } else if (last_event.eventName=="BuyerConfirmReceivingProduct" && last_event.args.sellerAddress==account.address) {
        toast({
          title: "Succesesful transaction",
          description: "Buyer has received the product and redeem deposit, you can proceed to withdraw your deposit for purchase id "+last_event.args.purchaseID,
          variant: "success",
        });
      }
      
    }
  }, [events, account]);

  console.log("isLoadingGlobal: ", isLoadingGlobal);

  return (
    <div className="h-screen flex flex-row bg-black relative">
      {/* Side bar */}
      <div className="w-12p">
        <Sidebar></Sidebar>
      </div>

      {/* Drawer */}
      {isLoadingGlobal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50 flex-col space-y-16">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#5588F6"}
            height={30}
            width={80}
          />
          <p className="text-[#5588F6] font-semibold text-xl">
            Transaction in progress...
          </p>
        </div>
      )}

      {/* content */}
      <div className="flex-1">
        {/* Nav bar */}
        <div className="flex flex-row p-4 justify-between px-10 items-center">
          <div>
            {navlinks.map((link: any, index: any) => (
              <p className="text-white text-xl">
                {link.link == location.pathname && link.name}
              </p>
            ))}
          </div>

          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row bg-[#3A3D45] w-[300px] h-[40px] rounded-3xl items-center pl-2 hover:opacity-70 transition-all duration-300">
              <FaSearch className="text-white w-[24px] h-[24px] pl-2 cursor-pointer"></FaSearch>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for anything"
                className="p-4 text-sm bg-transparent border-none outline-none focus:disabled "
              />
            </div>

            <IoIosNotificationsOutline className="text-white cursor-pointer font-bold w-[40px] h-[40px] rounded-full p-2 bg-[#3A3D45] hover:opacity-70 transition-all duration-300"></IoIosNotificationsOutline>

            <IoIosSettings className="text-white cursor-pointer font-bold w-[40px] h-[40px] rounded-full p-2 bg-[#3A3D45]"></IoIosSettings>
            <ConnectButton client={client} />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/buyer-transactions" element={<BuyerTransactions />} />
          <Route path="/seller-transactions" element={<SellerTransactions />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/myaccount/" element={<MyAccount />} />
          <Route
            path="/product-detail/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
