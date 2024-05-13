import React, { createContext, useEffect, useState } from "react";

// Tạo AuthContext
export const AuthContext = createContext();

// Tạo AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái người dùng, ban đầu không có người dùng đăng nhập
  useEffect(() => {
    const checkUserLogin = async () => {
      const userLogin = await localStorage.getItem("user");
      const userLoginParse = JSON.parse(userLogin);
      setUser(userLoginParse);
    };
    checkUserLogin();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
