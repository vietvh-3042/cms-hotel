const options = [
  {
    key: "",
    label: "Sơ đồ khách sạn",
    icon: "/images/Sidebar/Map/map.png",
  },
  {
    key: "hotel",
    label: "Khách sạn",
    icon: "/images/Sidebar/Hotel/hotel.png",
    children: [
      {
        key: "list-hotel",
        label: "Danh sách khách sạn",
        icon: "icon-user",
      },
      {
        key: "hotel-floor",
        label: "Quản lý Lầu/Tầng",
        icon: "icon-user",
      },
      {
        key: "hotel-diary",
        label: "Nhật ký sử dụng",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "room",
    label: "Loại phòng & Cài đặt",
    icon: "/images/Sidebar/Settings/setting.png",
    children: [
      {
        key: "list-room",
        label: "Danh sách loại phòng",
        icon: "icon-user",
      },
      {
        key: "list-model",
        label: "Danh sách giá mẫu",
        icon: "icon-user",
      },
      {
        key: "list-time",
        label: "Giá theo thời điểm",
        icon: "icon-user",
      },
      {
        key: "setting",
        label: "Cài đặt chung",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "2",
    label: "Dịch vụ & kho",
    icon: "/images/Sidebar/Services/service.png",
    children: [
      {
        key: "users",
        label: "Danh sách dịch vụ",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Thống kê DV đã bán",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "3",
    label: "Công nợ",
    icon: "/images/Sidebar/CongNo/congno.png",
    children: [
      {
        key: "users",
        label: "Công nợ phải thu",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Danh sách HĐ nợ",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "4",
    label: "Tiền chi & tiền thu",
    icon: "/images/Sidebar/TienChi/tienchi.png",
    children: [
      {
        key: "users",
        label: "Quản lý phiếu thu",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Quản lý phiếu chi",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "5",
    label: "Doanh thu",
    icon: "/images/Sidebar/DoanhThu/doanhthu.png",
    children: [
      {
        key: "users",
        label: "Doanh thu chi tiết",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Doanh thu bán phòng",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Doanh thu gần đây",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Phân tích biểu đồ",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "6",
    label: "Thống kê",
    icon: "/images/Sidebar/ThongKe/thongke.png",
    children: [
      {
        key: "users",
        label: "Doanh sách hóa đơn",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Kiểm tra $ tài khoản",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Kết quả kinh doanh",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Báo cáo",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "7",
    label: "Khách hàng",
    icon: "/images/Sidebar/KhachHang/khachhang.png",
    children: [
      {
        key: "users",
        label: "Khách hàng đang ở",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Khách hàng đặt phòng",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Khách hàng theo ngày",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Khách hàng để quên",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Danh sách khách hàng",
        icon: "icon-user",
      },
    ],
  },

  {
    key: "8",
    label: "Nhân viên",
    icon: "/images/Sidebar/Nhanvien/nhanvien.png",
    children: [
      {
        key: "users",
        label: "Lịch sử giao tiền",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Lịch sử giao ca",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Quản lý nhân viên",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Nhóm phân quyền",
        icon: "icon-user",
      },
    ],
  },
  {
    key: "9",
    label: "Hỗ trợ",
    icon: "/images/Sidebar/HoTro/hotro.png",
    children: [
      {
        key: "users",
        label: "Hướng dẫn sử dụng",
        icon: "icon-user",
      },
      {
        key: "users",
        label: "Gửi hỗ trợ",
        icon: "icon-user",
      },
    ],
  },
];
export default options;
