import { Request, Response } from "express";

export const getAdminDashboard = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      totalOrders: 245,
      revenue: 154700000,
      activeDeliveries: 18,
      activeProducts: 42,
      staffOnline: 9,
    },
    message: "Admin dashboard summary",
  });
};

export const getAdminOrders = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      {
        id: 301,
        customer: "Phạm Thị C",
        total: 108000,
        status: "Đang giao",
        updated: "2026-04-07T08:30:00Z",
      },
      {
        id: 302,
        customer: "Lê Văn D",
        total: 154000,
        status: "Xác nhận",
        updated: "2026-04-07T09:10:00Z",
      },
    ],
    message: "Admin orders loaded",
  });
};

export const getAdminRevenue = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      today: 2830000,
      thisWeek: 17500000,
      thisMonth: 72000000,
      topCategory: "Đồ uống",
    },
    message: "Revenue report loaded",
  });
};

export const getAdminProducts = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { id: 1, name: "Trà sữa trân châu", stock: 34, price: 45000 },
      { id: 2, name: "Bánh mì kẹp thịt", stock: 21, price: 39000 },
    ],
    message: "Products loaded",
  });
};

export const getAdminPayroll = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { staff: "Nguyễn Văn E", salary: 8500000, status: "Đã thanh toán" },
      { staff: "Trần Thị F", salary: 7800000, status: "Đang chờ" },
    ],
    message: "Payroll information loaded",
  });
};

export const getAdminSchedule = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { date: "2026-04-08", shift: "Sáng", staff: "Đội giao hàng" },
      { date: "2026-04-08", shift: "Chiều", staff: "Bếp chính" },
    ],
    message: "Admin schedule loaded",
  });
};
