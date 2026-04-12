import { useEffect, useState } from "react";
import api from "../services/api.js";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/products")
      .then((response) => setProducts(response.data.data || []))
      .catch(() => setError("Không tải được sản phẩm."));
  }, []);

  return (
    <div className="space-y-8">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <h1 className="text-4xl font-semibold text-slate-900">
          Quản lý sản phẩm
        </h1>
        <p className="mt-3 text-slate-600">Kiểm tra tồn kho và giá sản phẩm.</p>
      </header>
      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-8 text-rose-700">
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  {product.name}
                </h2>
                <span className="text-sm text-slate-500">
                  Còn: {product.stock}
                </span>
              </div>
              <p className="mt-3 text-slate-600">
                Giá: {product.price.toLocaleString("vi-VN")}₫
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
