import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
import { formatCurrency } from "../../helpers";
import GlobalApi from "../../api/GlobalApi";
import { toast } from "react-toastify";
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (currentPage) => {
    try {
      const response = await GlobalApi.getProductList(currentPage);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await GlobalApi.deleteProduct(productId);
      if (response.data.success) {
        toast.success(response.data.msg);
        setCurrentPage(1);
        fetchData(1);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error);
      } else {
        console.log("Lỗi:", error.message);
      }
    }
  };
  return (
    <div>
      <div className="mb-4 text-end">
        <Link
          className="bg-blue-500 px-3 py-2 rounded-lg text-white"
          to="/createProduct"
        >
          Tạo mới sản phẩm
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tùy chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center space-x-4">
                    {product.imagesUrl.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={`${API_URL}/images/${imageUrl}`}
                        alt={`Product ${index + 1}`}
                        className="w-64 h-64 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}đ</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteProduct(product?._id)}
                    className="bg-red-400 px-4 py-2 rounded-lg text-white"
                  >
                    Xóa
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button disabled={currentPage === 1} onClick={handlePrevPage}>
        Trước
      </Button>
      <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Sau
      </Button>
    </div>
  );
}

export default ProductPage;
