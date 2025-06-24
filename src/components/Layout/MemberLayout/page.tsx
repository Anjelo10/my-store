import React from "react";
import Sidebar from "../../fragments/Sidebar/page";

type Proptyps = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user",
  },
  {
    title: "Order",
    url: "/member/order",
    icon: "bxs-cart",
  },
];

const MemberLayout = (props: Proptyps) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full p-14  pl-[30vh] lg:pl-[40vh]">{children}</div>
    </div>
  );
};

export default MemberLayout;
