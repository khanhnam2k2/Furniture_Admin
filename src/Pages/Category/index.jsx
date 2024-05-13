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
import GlobalApi from "../../api/GlobalApi";
import { toast } from "react-toastify";
function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async (currentPage) => {
    try {
      const response = await GlobalApi.getCategoryList(currentPage);
      setCategories(response.data.categories);

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
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await GlobalApi.deleteCategory(categoryId);
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
          to="/createCategory"
        >
          Tạo mới danh mục
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Danh mục</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Tùy chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.icon}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteCategory(category?._id)}
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

export default CategoryPage;
