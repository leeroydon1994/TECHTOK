import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";

export const LoginSidebarData = [
  // {
  //   title: "Home",
  //   path: "/",
  //   icon: <AiIcons.AiFillHome />,
  //   cName: "nav-text",
  // },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Nasdaq 100",
    path: "/nasdaq100",
    icon: <AiIcons.AiOutlineStock />,
    cName: "nav-text",
  },
  {
    title: "Ranking",
    path: "/ratings",
    icon: <CgIcons.CgRowFirst />,
    cName: "nav-text",
  },
  {
    title: "My Faves",
    path: "/favorites",
    icon: <MdIcons.MdFavorite />,
    cName: "nav-text",
  },
  {
    title: "Currency",
    path: "/currency",
    icon: <HiIcons.HiCurrencyEuro />,
    cName: "nav-text",
  },
  {
    title: "Blog",
    path: "/blog",
    icon: <HiIcons.HiChatAlt />,
    cName: "nav-text",
  },
  {
    title: "News",
    path: "/news",
    icon: <FaIcons.FaNewspaper />,
    cName: "nav-text",
  },
];
