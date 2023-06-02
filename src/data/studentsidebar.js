import { FaTh, FaRegChartBar, FaCommentAlt, FaStore } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {RiMoneyDollarCircleLine} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";


const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/account/dashboard",
  },
  {
    title: "Store",
    icon: <FaStore />,
    path: "/account/store",
  },
  {
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    path: "/account/my-orders",
  },
  {
    title: "Transactions",
    icon: <RiMoneyDollarCircleLine />,
    path: "/account/transactions",
  },
    {
    title: "Profile",
    icon: <CgProfile />,
    path: "/account/profile",
  }
];

export default menu;
