import React from "react";
import Sidebar from "../../fragments/Sidebar/page";

type Proptyps = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: "bxs-cart",
  },
];

const AdminLayout = (props: Proptyps) => {
  const { children } = props;
  return (
    <div className="flex ">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full p-8 pl-[40vh]">{children}</div>
    </div>
  );
};

export default AdminLayout;
