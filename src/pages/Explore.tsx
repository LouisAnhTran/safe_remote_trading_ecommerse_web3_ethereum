import React from "react";
import DisplayInfo from "../components/DisplayInfo";
import DisplayData from "../components/DisplayData";
import CreateCampaign from "../components/CreateCampaign";
import { contract } from "@/main";
import { useDisconnect, useReadContract } from "thirdweb/react";
import ProductCard from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingState, setToLoad } from "@/features/load/loadSlice";

const Explore = () => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function returnAllProducts() view returns ((uint256 productId, address seller, string sellerName, string name, uint256 priceInWei, string description, string image, string category)[])",
    params: [],
  });

  const isLoadingGlobal=useSelector(getLoadingState)
  const dispatch=useDispatch()

  console.log("data: ", data);
  console.log("isLoadingGlobal: ",isLoadingGlobal)


  return (
    <div className="w-full flex flex-row justify-center overflow-y-auto">
      <div className="w-10/12">

        {/* // display products */}
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {!isPending &&
            data &&
            data.length > 0 &&
            data.map((product: any) => (
              <ProductCard product={product}></ProductCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
