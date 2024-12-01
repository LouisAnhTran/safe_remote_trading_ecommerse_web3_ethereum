import { MdExplore } from 'react-icons/md';
import { createCampaign, dashboard, logout, payment, profile, withdraw,home } from '../assets';
import { FaHome } from 'react-icons/fa';
import { IoHomeSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

export const navlinks = [
  {
    name: 'Explore',
    imgUrl: <MdTravelExplore className='w-[24px] h-[24px]'></MdTravelExplore> ,
    link: '/',
  },
  {
    name: 'Create Product',
    imgUrl: <AiFillProduct className='w-[24px] h-[24px]'></AiFillProduct>,
    link: '/create-product',
  },
  {
    name: 'Dashboard',
    imgUrl: <RxDashboard className='w-[24px] h-[24px]'></RxDashboard>,
    link: '/dashboard',
    disabled: true,
  },
  {
    name: 'Seller Transactions',
    imgUrl: <FaShoppingCart className='w-[24px] h-[24px]'></FaShoppingCart>,
    link: '/seller-transactions',
    disabled: true,
  },
  {
    name: 'Buyer Transactions',
    imgUrl: <FaShoppingCart className='w-[24px] h-[24px]'></FaShoppingCart>,
    link: '/buyer-transactions',
    disabled: true,
  },
  {
    name: 'Purchase History',
    imgUrl:  <RxDashboard className='w-[24px] h-[24px]'></RxDashboard>,
    link: '/profile',
  },
  {
    name: 'My Account',
    imgUrl: <MdAccountCircle className='w-[24px] h-[24px]'></MdAccountCircle>,
    link: '/myaccount',
  },
  {
    name: 'logout',
    imgUrl: <IoLogOut className='w-[24px] h-[24px]'></IoLogOut>,
    link: '/logout',
    disabled: true,
  },
];

// Enum mapping
export const stateMappingSeller = {
  0: "Buyer Showed Interest - Awaiting Your Acknowledgement",
  1: "You deposited - Awaiting buyer deposit or you can reclaim deposit",
  2: "Locked funds - Seller and Buyer Deposited",
  3: "Buyer Confirmed Receipt of Product",
  4: "Inactive Purchase Transaction",
  5: "Complete - Successful product exchange",
};

// Enum mapping
export const stateMappingBuyer = {
  0: "You Showed Interest - Awaiting Seller Acknowledgement or Cancel",
  1: "Seller deposited - Awaiting your deposit by confirming purchase",
  2: "Locked funds - Seller and Buyer Deposited",
  3: "You Confirmed Receipt of Product and Reclaimed Deposit",
  4: "Inactive Purchase Transaction",
  5: "Complete - Successful purchase transaction",
};