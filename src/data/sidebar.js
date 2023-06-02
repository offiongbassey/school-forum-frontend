import { FaTh, FaRegChartBar, FaCommentAlt, FaStore } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {RiMoneyDollarCircleLine} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import {IoIosWallet} from "react-icons/io";


const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Products",
    icon: <FaStore />,
    path: "/products",
  },
  {
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    path: "/orders",
  },
  {
    title: "Transactions",
    icon: <RiMoneyDollarCircleLine />,
    path: "/transactions",
  },
  {
    title: "Withdraw",
    icon: <IoIosWallet />,
    path: "/withdraw",
  },
    {
    title: "Profile",
    icon: <CgProfile />,
    path: "/profile",
  }
  
];

export default menu;
