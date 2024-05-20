import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin người dùng và token khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Đặt giá trị người dùng trở về null
    setUser(null);
    // Chuyển hướng đến trang đăng nhập
    navigateTo("/login");
  };
  return (
    <div className="bg-white py-6 shadow-lg px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <img src="/logo.png" className="w-16 h-16" />
        </div>

        <div className="">
          {user ? (
            // Nếu người dùng đã đăng nhập, hiển thị nút "Đăng xuất"
            <button onClick={handleLogout}>Đăng xuất</button>
          ) : (
            // Nếu người dùng chưa đăng nhập, hiển thị nút "Đăng nhập"
            <Link to="/login">Đăng nhập</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
