import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { IoHomeSharp } from "react-icons/io5";


const mapping=[]
const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>("dashboard");
  const location=useLocation();

  console.log("use location: ",location)

  return (
    <div className="p-4">
      <img
        src={thirdweb}
        alt="hello"
        className="w-[25%] h-[25%] object-contain ml-3"
      />

      <div className="flex flex-col space-y-4 mt-4 ">
        {navlinks.map((link: any,index: any) => (
          <div key={index}
            className={`flex flex-row hover:rounded-3xl group cursor-pointer hover:bg-[#051537] p-4 items-center transition-all duration-300 ${location.pathname==link.link && "bg-[#051537] rounded-3xl"}`}
            onClick={() => navigate(link.link)}
          >
            <div className={` group-hover:text-[#5588F6] text-white transition-all duration-300 ${location.pathname==link.link && "text-[#5588F6]"}`}>{link.imgUrl}
            </div>
            <p className={`text-sm group-hover:text-[#5588F6] ml-3 text-white transition-all duration-300 ${location.pathname==link.link && "text-[#5588F6]"}`}>{link.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
