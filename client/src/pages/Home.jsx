import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            RETASTE
          </p>
          <h1 className="mt-4 text-5xl font-semibold text-slate-900 sm:text-6xl">
            Gợi ý món ăn yêu thích cho bạn
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Khám phá thực đơn cá nhân hoá và đặt món nhanh chóng cùng RETASTE.
            Những gợi ý được tạo dựa trên lịch sử xem và món bán chạy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/recommendations"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Xem gợi ý món
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Khám phá menu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-xl">
          <div className="rounded-[28px] bg-slate-50 p-5 text-center shadow-sm">
            <p className="text-2xl font-semibold text-slate-900">150+</p>
            <p className="mt-2 text-sm text-slate-500">Món ăn đa dạng</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5 text-center shadow-sm">
            <p className="text-2xl font-semibold text-slate-900">24/7</p>
            <p className="mt-2 text-sm text-slate-500">Gợi ý nhanh chóng</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5 text-center shadow-sm">
            <p className="text-2xl font-semibold text-slate-900">Giao hàng</p>
            <p className="mt-2 text-sm text-slate-500">Hỗ trợ Lalamove</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
