import React from "react";

import { tagType, thirdweb } from "../assets";
import { useNavigate } from "react-router-dom";

// types.ts
export interface Product {
  productId: number;
  seller: string;
  sellerName: string;
  name: string;
  priceInWei: number;
  description: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

  return (
    <div
    key={product.productId}
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer hover:opacity-75 transition-all"
      onClick={() => navigate(`/product-detail/${product.productId}`)}
    >
      <img
        src={product.image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            {product.category}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#5588F6] text-left leading-[26px] truncate">
            {product.name}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate text-xs">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {product.priceInWei}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              <p className="font-semibold text-[#b2b3bd]">Price in Ether</p>
              {Number(product.priceInWei) / 1e18} 
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              14
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Stocks Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{product.seller}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
