import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../services/api.js";
import {
  ShoppingCart,
  Package,
  Truck,
  DollarSign,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((response) => setSummary(response.data.data))
      .catch(() => setError("Không thể tải dashboard."));
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white p-6 shadow-sm sticky top-0">
        <h1 className="text-3xl font-semibold text-slate-900">
          Dashboard Admin
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Tổng quan doanh thu, đơn hàng và quản lý nội dung
        </p>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error}
          </div>
        ) : !summary ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-slate-200 mx-auto mb-4 animate-pulse"></div>
              <p className="text-slate-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Tổng đơn hàng
                    </p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">
                      {summary.totalOrders || 0}
                    </p>
                  </div>
                  <ShoppingCart
                    size={40}
                    className="text-blue-500 opacity-20"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Doanh thu
                    </p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">
                      {(summary.revenue || 0).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                  <DollarSign size={40} className="text-green-500 opacity-20" />
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Giao hàng
                    </p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">
                      {summary.activeDeliveries || 0}
                    </p>
                  </div>
                  <Truck size={40} className="text-orange-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Hành động nhanh
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Link
                  to="/admin/products/new"
                  className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 text-blue-700 hover:bg-blue-100 transition font-medium"
                >
                  <Plus size={20} />
                  <span>Thêm sản phẩm</span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700 hover:bg-green-100 transition font-medium"
                >
                  <ShoppingCart size={20} />
                  <span>Xem đơn hàng</span>
                </Link>
                <Link
                  to="/admin/delivery"
                  className="flex items-center gap-3 rounded-lg bg-orange-50 p-4 text-orange-700 hover:bg-orange-100 transition font-medium"
                >
                  <Truck size={20} />
                  <span>Giao hàng</span>
                </Link>
                <Link
                  to="/admin/revenue"
                  className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 text-purple-700 hover:bg-purple-100 transition font-medium"
                >
                  <DollarSign size={20} />
                  <span>Doanh thu</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
