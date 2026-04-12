import { useEffect, useState } from "react";
import { Gift, Sparkles, AlertCircle, Copy, CheckCircle } from "lucide-react";
import api from "../services/api.js";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await api.get("/promotions");
        if (response.data.success) {
          setPromotions(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Không thể tải danh sách khuyến mãi");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="rounded-[32px] bg-white p-10 text-center text-slate-600 shadow-sm">
        Đang tải khuyến mãi...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">
              Khuyến mãi nóng
            </h1>
            <p className="mt-2 text-slate-600">
              Các ưu đãi được cập nhật liên tục để bạn đặt hàng tiết kiệm hơn.
            </p>
          </div>
        </div>
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

      {promotions.length === 0 ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg text-slate-600">Hiện chưa có khuyến mãi nào</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {promotions.map((promo) => {
            const isExpired = new Date(promo.end_date) < new Date();
            const isUsageLimit = promo.usage_limit && promo.used_count >= promo.usage_limit;
            const isDisabled = isExpired || isUsageLimit;

            return (
              <div
                key={promo.id}
                className={`rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  isDisabled ? "opacity-50" : ""
                }`}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white">
                  <Gift size={24} />
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {promo.promo_name}
                    </h2>
                    {promo.promo_code && (
                      <p className="mt-2 text-sm text-slate-500">
                        Mã: <span className="font-mono font-bold">{promo.promo_code}</span>
                      </p>
                    )}
                  </div>

                  {/* Discount info */}
                  <div className="bg-slate-50 rounded-lg p-3">
                    {promo.discount_type === "percent" ? (
                      <p className="text-lg font-bold text-rose-600">
                        Giảm {promo.discount_value}%
                        {promo.max_discount && ` (tối đa ${promo.max_discount.toLocaleString("vi-VN")}₫)`}
                      </p>
                    ) : (
                      <p className="text-lg font-bold text-rose-600">
                        Giảm {promo.discount_value.toLocaleString("vi-VN")}₫
                      </p>
                    )}
                    {promo.min_order_value > 0 && (
                      <p className="text-xs text-slate-600 mt-1">
                        Đơn hàng tối thiểu: {promo.min_order_value.toLocaleString("vi-VN")}₫
                      </p>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm">{promo.description}</p>

                  {/* Expiry info */}
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Có hiệu lực đến: {formatDate(promo.end_date)}</p>
                    {promo.usage_limit && (
                      <p>
                        Đã sử dụng: {promo.used_count}/{promo.usage_limit}
                      </p>
                    )}
                  </div>

                  {/* Status badges */}
                  <div className="flex flex-wrap gap-2">
                    {isExpired && (
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                        Hết hạn
                      </span>
                    )}
                    {isUsageLimit && (
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                        Hết lước dùng
                      </span>
                    )}
                    {!isDisabled && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Có sẵn
                      </span>
                    )}
                  </div>

                  {/* Copy code button */}
                  {promo.promo_code && !isDisabled && (
                    <button
                      onClick={() => handleCopyCode(promo.promo_code)}
                      className="w-full mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 flex items-center justify-center gap-2"
                    >
                      {copiedCode === promo.promo_code ? (
                        <>
                          <CheckCircle size={16} />
                          Đã sao chép!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Sao chép mã
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Promotions;
