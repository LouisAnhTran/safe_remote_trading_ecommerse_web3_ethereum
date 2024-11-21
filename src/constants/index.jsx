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
    name: 'Purchase Transactions',
    imgUrl: <FaShoppingCart className='w-[24px] h-[24px]'></FaShoppingCart>,
    link: '/purchase-transactions',
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
