import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Utensils,
  Truck,
  Users,
  DollarSign,
  Clock,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("retaste_token");
    localStorage.removeItem("retaste_user_role");
    navigate("/admin/login");
  };

  const adminMenuItems = [
    { label: "Dashboard", icon: BarChart3, path: "/admin/dashboard" },
    { label: "Đơn hàng", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Sản phẩm", icon: Package, path: "/admin/products" },
    { label: "Danh mục", icon: Utensils, path: "/admin/categories" },
    { label: "Giao hàng", icon: Truck, path: "/admin/delivery" },
    { label: "Doanh thu", icon: DollarSign, path: "/admin/revenue" },
    { label: "Nhân sự", icon: Users, path: "/admin/payroll" },
    { label: "Lịch", icon: Clock, path: "/admin/schedule" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } fixed md:static top-0 left-0 h-screen bg-slate-900 text-white transition-all duration-300 flex flex-col z-50`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-700 p-4">
          <h2
            className={`font-bold text-lg ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            RETASTE
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-800 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto space-y-1 p-3">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
                onClick={() => {
                  // Close sidebar on mobile when navigating
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-slate-700 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:ml-0 ml-0">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
