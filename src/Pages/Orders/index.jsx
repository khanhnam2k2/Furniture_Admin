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
  Typography,
  Modal,
  Box,
} from "@mui/material";
import GlobalApi from "../../api/GlobalApi";
import moment from "moment";
import { formatCurrency } from "../../helpers";
import { API_URL } from "../../../config";
import { toast } from "react-toastify";
const statusMapping = {
  0: "Chờ xác nhận",
  1: "Đang giao",
  2: "Hoàn thành",
  3: "Hủy",
};
function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(null);
  const fetchData = async (currentPage) => {
    try {
      const response = await GlobalApi.getOrderList(currentPage);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewStatus(null);
    setModalOpen(false);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleStatusChange = (e) => {
    setNewStatus(parseInt(e.target.value));
  };
  const handleUpdateStatus = async () => {
    try {
      const response = await GlobalApi.updateStatusOrder(
        selectedOrder._id,
        newStatus
      );
      toast.success(response.data.message);
      handleCloseModal();
      setCurrentPage(1);
      fetchData(1);
      // Refresh orders list after updating status
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <div>
      <div className="mb-4 text-end"></div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Người đặt</TableCell>
              <TableCell>Địa chỉ giao hàng</TableCell>
              <TableCell>Thời gian đặt</TableCell>
              <TableCell>Tổng tiền đơn hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Tùy chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.user.username}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  {moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>

                <TableCell>{formatCurrency(order.totalPrice)}đ</TableCell>
                <TableCell>{statusMapping[order.status]}</TableCell>

                <TableCell>
                  <div className="flex  items-center gap-2">
                    <button
                      className="bg-blue-400 py-2 px-4 rounded-lg text-white"
                      onClick={() => handleOpenModal(order)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
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
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Chi tiết đơn hàng
          </Typography>
          {selectedOrder && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p>Người đặt: {selectedOrder.user.username}</p>
                <p>Địa chỉ giao hàng: {selectedOrder.address}</p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p>
                  Thời gian đặt:{" "}
                  {moment(selectedOrder.createdAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </p>
                <p>
                  Tổng tiền đơn hàng: {formatCurrency(selectedOrder.totalPrice)}
                  đ
                </p>
              </div>

              <div className="mb-3">
                Trạng thái:{" "}
                <div>
                  <select
                    name="status"
                    id="status"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    value={
                      newStatus !== null ? newStatus : selectedOrder.status
                    }
                    onChange={(e) => handleStatusChange(e)}
                  >
                    {Object.entries(statusMapping).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Display items in the order */}
              <h3>Các sản phẩm trong đơn hàng:</h3>
              <div>
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-2 mt-2"
                  >
                    <img
                      className="w-32 h-32 border-2"
                      src={`${API_URL}/images/${item.product.imagesUrl[0]}`}
                    />
                    <div className="flex flex-col gap-2">
                      <p>Tên: {item.product.name}</p>
                      <p>Số lượng: {item.quantity}</p>
                      <p>Giá bán: {formatCurrency(item.price)}đ</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-end mt-4">
                {newStatus !== null && newStatus !== selectedOrder.status && (
                  <button
                    className="bg-yellow-400 py-2 px-4 rounded-lg text-white"
                    onClick={handleUpdateStatus}
                  >
                    Cập nhật lên trạng thái {statusMapping[newStatus]}
                  </button>
                )}
              </div>
            </div>
          )}
          <Button
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleCloseModal}
          >
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default OrderPage;
