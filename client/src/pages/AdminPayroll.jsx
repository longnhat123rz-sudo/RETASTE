import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import api from "../services/api.js";

function AdminPayroll() {
  const [payroll, setPayroll] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/payroll")
      .then((response) => setPayroll(response.data.data || []))
      .catch(() => setError("Không tải được bảng lương."));
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white p-6 shadow-sm sticky top-0">
        <h1 className="text-3xl font-semibold text-slate-900">Quản lý Nhân sự</h1>
        <p className="mt-1 text-sm text-slate-600">Sinh nhật nhân viên, lương và thông tin</p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="space-y-6">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <h1 className="text-4xl font-semibold text-slate-900">
          Lương nhân viên
        </h1>
        <p className="mt-3 text-slate-600">
          Xem thông tin lương và trạng thái thanh toán.
        </p>
      </header>
      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8 text-rose-700">
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {payroll.map((item, index) => (
            <div
              key={index}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.staff}
                </h2>
                <span className="text-sm text-slate-500">{item.status}</span>
              </div>
              <p className="mt-3 text-slate-600">
                Lương: {item.salary.toLocaleString("vi-VN")}₫
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPayroll;
