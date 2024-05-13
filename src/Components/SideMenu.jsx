import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SideMenu() {
  const { user } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState(""); // State để lưu trữ menu đang active

  const menuList = [
    {
      name: "Bảng điều khiển",
      link: "/",
    },
    {
      name: "Quản lý đơn đặt hàng",
      link: "/orders",
    },
    {
      name: "Quản lý danh mục",
      link: "/categories",
    },
    {
      name: "Quản lý sản phẩm",
      link: "/products",
    },
  ];

  const handleMenuClick = (name) => {
    setActiveMenu(name); // Cập nhật menu đang active khi người dùng nhấp vào
  };

  return (
    <div className="overflow-y-auto w-80 md:block  hidden">
      <div className="w-full flex h-screen flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <ul className="mt-6 space-y-1">
            {menuList.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  className={`block rounded-lg px-4 py-2 text-base font-medium ${
                    activeMenu === menu.name
                      ? "text-white bg-blue-400"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => handleMenuClick(menu.name)}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <div>
              <p className="text-lg">
                <strong className="block font-medium">{user.username}</strong>
                <span> {user.email}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
