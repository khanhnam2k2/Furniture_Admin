import React, { useEffect, useState } from "react";
import GlobalApi from "../../api/GlobalApi";
import { toast } from "react-toastify";

function CreateCategory() {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep = await GlobalApi.createCategory(formData);
      if (rep.data.success) {
        toast(rep.data.msg);
        setFormData({
          name: "",
          icon: "",
          description: "",
        });
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
      <h2 className="text-2xl font-bold mb-4">Tạo mới danh mục</h2>
      <form onSubmit={handleSubmit} method="POST" className="space-y-4">
        <div className="">
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
          <label className="block mb-1">
            Icon ("Hãy nhập đường link ảnh"):
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            required
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Mô tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          ></textarea>
        </div>

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

export default CreateCategory;
