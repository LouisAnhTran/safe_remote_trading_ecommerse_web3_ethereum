import React from "react";
import DisplayInfo from "../components/DisplayInfo";
import DisplayData from "../components/DisplayData";
import CreateCampaign from "../components/CreateCampaign";
import { contract } from "@/main";
import { useDisconnect, useReadContract } from "thirdweb/react";
import ProductCard from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingState, setToLoad } from "@/features/load/loadSlice";
import ReactLoading from "react-loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const categories = [
  { value: "data-training", label: "Data for Training LLM" },
  { value: "ethereum-tokens", label: "Ethereum Tokens" },
  { value: "nft-collectibles", label: "NFT Collectibles" },
  { value: "physical-goods", label: "Physical Goods" },
  { value: "digital-assets", label: "Digital Assets" },
  { value: "subscriptions", label: "Subscriptions" },
  { value: "services", label: "Services" },
];

const Explore = () => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function returnAllProducts() view returns ((uint256 productId, address seller, string sellerName, string name, uint256 priceInWei, string description, string image, string category)[])",
    params: [],
  });

  const isLoadingGlobal = useSelector(getLoadingState);
  const dispatch = useDispatch();

  console.log("data: ", data);
  console.log("isLoadingGlobal: ", isLoadingGlobal);

  return (
    <div className="w-full flex flex-row justify-center overflow-y-auto">
      {isPending && (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-16 mt-40">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#5588F6"}
            height={30}
            width={80}
          />
          <p className="text-[#5588F6] font-semibold">Loading...</p>
        </div>
      )}

      {!isPending && (
        <div className="w-10/12">
          {/* // chose category */}
          <Select>
            <SelectTrigger className="w-[280px] bg-[#3A3D45] focus:disabled border-none text-slate-400">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent className="bg-[#3A3D45] border-none focus:disabled text-slate-400 hover:disabled">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-col w-full h-[850px] justify-between">
            {/* // display products */}
            <div className="flex flex-wrap mt-[40px] gap-[26px]">
              {!isPending &&
                data &&
                data.length > 0 &&
                data.map((product: any) => (
                  <ProductCard product={product}></ProductCard>
                ))}
            </div>

            <div className="h-2/12">
              {/* // Pagination */}
              <Pagination>
                <PaginationContent>

                  <PaginationItem>
                    <PaginationPrevious href="#" className="bg-[#3A3D45] text-slate-400" />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink href="#" className="bg-[#3A3D45] text-slate-400">1</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationEllipsis className="text-slate-300"/>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext href="#" className="bg-[#3A3D45] text-slate-400" />
                  </PaginationItem>

                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
