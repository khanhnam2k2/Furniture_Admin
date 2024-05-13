import axios from "axios";
import { API_URL } from "../../config";

const axiosClient = axios.create({
  baseURL: `${API_URL}`,
});

const createProduct = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosClient.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getCategoryList = async (page) => {
  try {
    const response = await axiosClient.get("/api/category?page=" + page);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const getProductList = async (page) => {
  try {
    const response = await axiosClient.get("/api/product?page=" + page);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const createCategory = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosClient.post("/api/category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getOrderList = async (page) => {
  try {
    const response = await axiosClient.get("/api/order?page=" + page);
    return response;
  } catch (error) {
    throw error;
  }
};
const updateStatusOrder = async (orderId, status) => {
  try {
    const response = await axiosClient.put(
      "/api/order/updateStatus/" + orderId,
      {
        status: status,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosClient.delete("/api/category/" + categoryId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosClient.delete("/api/product/" + productId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default {
  createProduct,
  createCategory,
  getCategoryList,
  getOrderList,
  updateStatusOrder,
  deleteCategory,
  getProductList,
  deleteProduct,
};
