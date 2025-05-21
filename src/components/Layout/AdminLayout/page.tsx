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
];

const AdminLayout = (props: Proptyps) => {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
