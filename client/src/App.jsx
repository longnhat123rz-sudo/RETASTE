import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { useAuth } from "./hooks/useAuth.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Menu from "./pages/Menu.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import CustomerOrders from "./pages/CustomerOrders.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Combo from "./pages/Combo.jsx";
import Promotions from "./pages/Promotions.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminRevenue from "./pages/AdminRevenue.jsx";
import AdminProductsList from "./pages/AdminProductsList.jsx";
import AdminProductForm from "./pages/AdminProductForm.jsx";
import AdminPayroll from "./pages/AdminPayroll.jsx";
import AdminSchedule from "./pages/AdminSchedule.jsx";
import AdminCategoriesList from "./pages/AdminCategoriesList.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import StaffLogin from "./pages/StaffLogin.jsx";
import StaffOrders from "./pages/StaffOrders.jsx";
import StaffRegister from "./pages/StaffRegister.jsx";
import StaffSchedule from "./pages/StaffSchedule.jsx";
import StaffFeedback from "./pages/StaffFeedback.jsx";
import DeliveryManagement from "./pages/DeliveryManagement.jsx";
import NotFound from "./pages/NotFound.jsx";

// Header component to show user info in navbar
function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm font-medium text-slate-700 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            RETASTE
          </Link>
          <Link to="/menu" className="hover:text-slate-900">
            Menu
          </Link>
          <Link to="/recommendations" className="hover:text-slate-900">
            Gợi ý món
          </Link>
          <Link to="/combo" className="hover:text-slate-900">
            Combo
          </Link>
          <Link to="/promotions" className="hover:text-slate-900">
            Khuyến mãi
          </Link>
          <Link to="/cart" className="hover:text-slate-900">
            Giỏ hàng
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Chào, {user?.name || "Bạn"}</span>
                <Link
                  to="/orders"
                  className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 text-xs"
                >
                  Đơn hàng
                </Link>
                <Link
                  to="/profile"
                  className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 text-xs"
                >
                  Hồ sơ
                </Link>
              </div>
              <button
                onClick={logout}
                className="rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 text-xs"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/register" element={<StaffRegister />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/recommendations" element={<Recommendation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
          <Route path="/combo" element={<Combo />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />
          <Route path="/admin/products" element={<AdminProductsList />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route
            path="/admin/products/:id/edit"
            element={<AdminProductForm />}
          />
          <Route path="/admin/categories" element={<AdminCategoriesList />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/schedule" element={<AdminSchedule />} />
          <Route path="/admin/delivery" element={<DeliveryManagement />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/orders" element={<StaffOrders />} />
          <Route path="/staff/schedule" element={<StaffSchedule />} />
          <Route path="/staff/feedback" element={<StaffFeedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
