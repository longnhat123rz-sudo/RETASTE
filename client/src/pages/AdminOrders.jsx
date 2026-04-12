import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../services/api.js";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/orders")
      .then((response) => setOrders(response.data.data || []))
      .catch(() => setError("Không tải được đơn hàng."));
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white p-6 shadow-sm sticky top-0">
        <h1 className="text-3xl font-semibold text-slate-900">Quản lý Đơn hàng</h1>
        <p className="mt-1 text-sm text-slate-600">Theo dõi và điều phối đơn hàng</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="space-y-4">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <h1 className="text-4xl font-semibold text-slate-900">
          Quản lý đơn hàng
        </h1>
        <p className="mt-3 text-slate-600">
          Theo dõi và điều phối đơn hàng cho admin.
        </p>
      </header>

      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8 text-rose-700">
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Đơn #{order.id}
                </h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <span>Khách: {order.customer}</span>
                <span>Giá: {order.total.toLocaleString("vi-VN")}₫</span>
                <span>{order.updated}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;
