import { useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../services/api.js";

function DeliveryManagement() {
  const [pickup, setPickup] = useState("Địa chỉ lấy hàng");
  const [dropoff, setDropoff] = useState("Địa chỉ giao hàng");
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuote = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/delivery/quote", {
        pickup: { address: pickup, lat: 10.762622, lng: 106.660172 },
        dropoff: { address: dropoff, lat: 10.762622, lng: 106.700172 },
      });
      setQuote(response.data.data);
    } catch (error) {
      setMessage("Không thể lấy báo giá.");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/delivery/order", {
        serviceType: "MOTORCYCLE",
        requestTime: Date.now(),
        stops: [
          { address: pickup, lat: 10.762622, lng: 106.660172, type: "PICKUP" },
          {
            address: dropoff,
            lat: 10.762622,
            lng: 106.700172,
            type: "DELIVERY",
          },
        ],
      });
      setMessage("Đã tạo đơn giao hàng: " + JSON.stringify(response.data.data));
    } catch (error) {
      setMessage("Không thể tạo đơn giao hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white p-6 shadow-sm sticky top-0">
        <h1 className="text-3xl font-semibold text-slate-900">Quản lý Giao hàng</h1>
        <p className="mt-1 text-sm text-slate-600">Tích hợp với Lalamove để giao hàng</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="space-y-8">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <h1 className="text-4xl font-semibold text-slate-900">
          Quản lý giao hàng
        </h1>
        <p className="mt-3 text-slate-600">
          Kết nối Lalamove để lấy báo giá và tạo đơn giao hàng tự động.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleQuote}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Địa chỉ lấy hàng
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Đang xử lý..." : "Lấy báo giá giao hàng"}
            </button>
          </form>

          {quote && (
            <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Báo giá</h2>
              <p className="mt-3 text-slate-600">
                Khoảng cách: {quote.distance} km
              </p>
              <p className="mt-2 text-slate-600">
                Phí: {quote.amount.toLocaleString("vi-VN")}₫
              </p>
              <button
                type="button"
                onClick={handleCreateOrder}
                className="mt-6 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Tạo đơn giao hàng
              </button>
            </div>
          )}

          {message && <p className="mt-6 text-sm text-slate-700">{message}</p>}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Đơn giao hàng mẫu
          </h2>
          <p className="mt-4 text-slate-600">
            Sử dụng trang này để demo tính năng Lalamove và quản lý giao hàng.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-3xl border border-slate-200 bg-white p-4">
              Đơn #501 - Trà sữa trân châu - Đang giao
            </li>
            <li className="rounded-3xl border border-slate-200 bg-white p-4">
              Đơn #502 - Bánh mì kẹp thịt - Chuẩn bị
            </li>
            <li className="rounded-3xl border border-slate-200 bg-white p-4">
              Đơn #503 - Set combo gia đình - Hoàn thành
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
    </AdminLayout>
  );
}

export default DeliveryManagement;
