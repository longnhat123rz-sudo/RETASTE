import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setItems(response.data.data || []);
      })
      .catch(() => {
        setError("Không thể tải menu. Vui lòng thử lại sau.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Thực đơn
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Menu món ăn
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Xem nhanh các món hot và chọn ngay món yêu thích.
        </p>
      </header>

      {loading ? (
        <div className="rounded-[32px] bg-white p-10 text-center text-slate-600 shadow-sm">
          Đang tải menu...
        </div>
      ) : error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8 text-slate-700">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 h-48 overflow-hidden rounded-3xl bg-slate-100">
                <img
                  src={
                    item.image_url ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={item.product_name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {item.product_name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description || "Món ăn hấp dẫn trong menu RETASTE."}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="text-lg font-semibold text-slate-900">
                  {item.base_price?.toLocaleString("vi-VN")}₫
                </span>
                <Link
                  to={`/product/${item.id}`}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Xem chi tiết
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
