import React from "react";
import Sidebar from "../../fragments/Sidebar/page";

type Proptyps = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "order",
    url: "/member/order",
    icon: "bxs-cart",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user",
  },
];

const MemberLayout = (props: Proptyps) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full p-14">{children}</div>
    </div>
  );
};

export default MemberLayout;
