import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { contract } from "@/main";
import { useReadContract } from "thirdweb/react";
import ReactLoading from "react-loading";

interface ProductHoverProps {
  productId: string; // Assuming productId is a string, you can change the type accordingly
}

const ProductHover: React.FC<ProductHoverProps> = ({ productId }) => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function returnAllProducts() view returns ((uint256 productId, address seller, string sellerName, string name, uint256 priceInWei, string description, string image, string category)[])",
    params: [],
  });

  let product = null;
  if (data) {
    product = data.find((item) => Number(item.productId) === Number(productId));
  }

  return (
    <div className="w-full h-full">
      {isPending && (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#5588F6"}
            height={30}
            width={40}
          />
          <p className="text-[#5588F6] font-semibold text-sm">
            Loading product detail...
          </p>
        </div>
      )}

      {data && product && (
        <div className="w-full h-full flex flex-row space-x-2">
          <div className="w-4/12">
            <img
              src={product?.image}
              alt="tag"
              className="w-[100px] h-[100px] object-cover rounded-[20px]"
            />
          </div>

          <div className="flex-1 flex-col space-y-2">
            <div>
              <p className="font-bold">Product name</p>
              <p className="text-xs">{product?.name}</p>
            </div>

            <div>
              <p className="font-bold">Description</p>
              <p className="text-xs">{product?.description}</p>
            </div>

            <div>
              <p className="font-bold">Category</p>
              <p className="text-xs">{product?.category}</p>
            </div>

            <div>
              <p className="font-bold">Price</p>
              <p className="text-xs">{Number(product.priceInWei) / 1e18} ETH</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHover;
