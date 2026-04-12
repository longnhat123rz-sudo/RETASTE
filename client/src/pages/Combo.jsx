import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../hooks/useAuth.js";
import api from "../services/api.js";
import { ShoppingCart, AlertCircle } from "lucide-react";

function Combo() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await api.get("/combos");
        if (response.data.success) {
          setCombos(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching combos:", err);
        setError("Không thể tải danh sách combo");
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const handleAddCombo = (combo) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để thêm combo vào giỏ hàng");
      navigate("/login");
      return;
    }

    // Thêm combo như một sản phẩm
    addToCart(
      {
        id: combo.id,
        product_name: combo.combo_name,
        base_price: combo.combo_price,
        image_url: combo.image_url,
        description: combo.description,
      },
      1,
      null
    );
    alert(`Đã thêm combo "${combo.combo_name}" vào giỏ hàng!`);
  };

  if (loading) {
    return (
      <div className="rounded-[32px] bg-white p-10 text-center text-slate-600 shadow-sm">
        Đang tải combo...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <h1 className="text-4xl font-semibold text-slate-900">Combo ưu đãi</h1>
        <p className="mt-3 text-slate-600">
          Các gói combo tiết kiệm dành cho gia đình và cặp đôi.
        </p>
      </header>

      {error && (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-6 flex gap-4 text-rose-700">
          <AlertCircle size={24} className="flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold">Lỗi</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {combos.length === 0 ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg text-slate-600">Hiện chưa có combo nào</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {combos.map((combo) => {
            const discountPercent = Math.round(
              ((combo.original_price - combo.combo_price) / combo.original_price) * 100
            );
            return (
              <div
                key={combo.id}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                {combo.image_url && (
                  <div className="rounded-[24px] overflow-hidden bg-slate-100 h-40 mb-4">
                    <img
                      src={combo.image_url}
                      alt={combo.combo_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="relative">
                  {discountPercent > 0 && (
                    <div className="absolute -top-6 right-0 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercent}%
                    </div>
                  )}

                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                    Combo
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">
                    {combo.combo_name}
                  </h2>
                  <p className="mt-2 text-slate-600 text-sm line-clamp-2">
                    {combo.description}
                  </p>

                  {/* Items trong combo */}
                  {combo.items && combo.items.length > 0 && (
                    <div className="mt-3 bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Gồm:</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {combo.items.map((item, idx) => (
                          <li key={idx}>• {item.product_name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 space-y-2">
                    {combo.original_price > combo.combo_price && (
                      <div className="flex gap-2 items-center">
                        <span className="text-sm line-through text-slate-400">
                          {combo.original_price.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    )}
                    <span className="text-2xl font-bold text-slate-900">
                      {combo.combo_price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="w-full mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Combo;
