import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

function Recommendation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/recommendations")
      .then((response) => {
        setItems(response.data.data || []);
      })
      .catch(() => {
        setError("Không thể tải gợi ý món. Vui lòng đăng nhập và thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Trang gợi ý món
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            Món ăn dành riêng cho bạn
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Dựa trên lịch sử xem và xu hướng bán chạy, RETASTE gợi ý những món
            ngon nhất.
          </p>
        </header>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm">
            Đang tải gợi ý...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-rose-50 border border-rose-200 p-8 text-center text-rose-700">
            <p>{error}</p>
            <Link
              to="/login"
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Đăng nhập để xem gợi ý
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 h-48 overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src={
                      item.image_url ||
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {item.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description ||
                      "Món ngon được đề xuất dựa trên sở thích của bạn."}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-slate-900">
                  <span className="text-lg font-semibold">
                    {item.price?.toLocaleString("vi-VN")}₫
                  </span>
                  <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Thêm vào giỏ
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
