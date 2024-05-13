import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import ProductPage from "../../Pages/Product";
import CreateProduct from "../../Pages/Product/createProduct";
import CategoryPage from "../../Pages/Category";
import CreateCategory from "../../Pages/Category/createCategory";
import OrderPage from "../../Pages/Orders";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/products" element={<ProductPage />}></Route>
      <Route path="/createProduct" element={<CreateProduct />}></Route>
      <Route path="/categories" element={<CategoryPage />}></Route>
      <Route path="/createCategory" element={<CreateCategory />}></Route>
      <Route path="/orders" element={<OrderPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
