import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import GlobalApi from "../../api/GlobalApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigateTo = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    rating: "",
    quantity: "",
    price: "",
    materials: "",
    size: "",
    category: "",
    description: "",
    favoriteCount: 0,
    favoriteBy: [],
    bestsellers: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          formDataToSend.append("images", value[i]);
        }
      } else {
        formDataToSend.append(key, value);
      }
    });
    try {
      const rep = await GlobalApi.createProduct(formDataToSend);
      if (rep.status === 201) {
        setFormData({
          name: "",
          images: [],
          rating: "",
          quantity: "",
          price: "",
          materials: "",
          size: "",
          category: "",
          description: "",
          bestsellers: false,
        });
        navigateTo("/products");
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tạo mới sản phẩm</h2>
      <form
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block mb-1">Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Giá:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Ảnh:</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            required
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        {formData.images &&
          Array.from(formData.images).map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Product ${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        <div className="flex gap-4 items-center ">
          <div className="flex-1">
            <label className="block mb-1">Kích thước:</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Số lượng:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Rating:</label>
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              required
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Chất liệu:</label>
          <input
            type="text"
            name="materials"
            value={formData.materials}
            onChange={handleInputChange}
            required
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Danh mục:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Mô tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          ></textarea>
        </div>

        {/* Add other input fields for other product attributes */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Tạo
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
