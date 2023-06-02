import { FaTh, FaRegChartBar, FaCommentAlt, FaStore } from "react-icons/fa";
import { BiUserPin } from "react-icons/bi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {RiMoneyDollarCircleLine, RiAdminFill, RiBankLine} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import {IoIosWallet} from "react-icons/io";




const adminMenu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/admin/dashboard",
  },
  {
    title: "Lecturers",
    icon: <RiAdminFill />,
    path: "/admin/lecturers",
  },
  {
    title: "Students",
    icon: <BiUserPin />,
    path: "/admin/students",
  },
  {
    title: "Products",
    icon: <FaStore />,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    path: "/admin/orders",
  },
  {
    title: "Transactions",
    icon: <RiMoneyDollarCircleLine />,
    path: "/admin/transactions",
  },
  {
    title: "Withdraw",
    icon: <IoIosWallet />,
    path: "/admin/withdraw",
  },
  {
    title: "Banks",
    icon: <RiBankLine />,
    path: "/admin/banks",
  },
  {
    title: "Profile",
    icon: <CgProfile />,
    path: "/admin/profile",
  }
];

export default adminMenu;
