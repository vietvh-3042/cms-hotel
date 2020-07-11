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
				icon: "/images/Sidebar/Hotel/sub-hotel.png",
			},
			{
				key: "hotel-floor",
				label: "Quản lý Lầu/Tầng",
				icon: "/images/Sidebar/Hotel/sub-hotel.png",
			},
			{
				key: "hotel-diary",
				label: "Nhật ký sử dụng",
				icon: "/images/Sidebar/Hotel/hotel-nhatki.png",
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
				icon: "/images/Sidebar/Settings/price.png",
			},
			{
				key: "sample-price",
				label: "Danh sách giá mẫu",
				icon: "/images/Sidebar/Settings/price.png",
			},
			{
				key: "price-time",
				label: "Giá theo thời điểm",
				icon: "/images/Sidebar/Settings/price.png",
			},
			// {
			//   key: "setting",
			//   label: "Cài đặt chung",
			//   icon: "icon-user",
			// },
		],
	},

	{
		key: "service",
		label: "Dịch vụ & kho",
		icon: "/images/Sidebar/Services/service.png",
		children: [
			{
				key: "list-service",
				label: "Danh sách dịch vụ",
				icon: "/images/Sidebar/Services/list-service.png",
			},
			{
				key: "users",
				label: "Thống kê DV đã bán",
				icon: "/images/Sidebar/Services/statistical.png",
			},
		],
	},

	// {
	//   key: "3",
	//   label: "Công nợ",
	//   icon: "/images/Sidebar/CongNo/congno.png",
	//   children: [
	//     {
	//       key: "users",
	//       label: "Công nợ phải thu",
	//       icon: "icon-user",
	//     },
	//     {
	//       key: "users",
	//       label: "Danh sách HĐ nợ",
	//       icon: "icon-user",
	//     },
	//   ],
	// },

	{
		key: "4",
		label: "Tiền chi & tiền thu",
		icon: "/images/Sidebar/TienChi/tienchi.png",
		children: [
			{
				key: "users",
				label: "Quản lý phiếu thu",
				icon: "/images/Sidebar/TienChi/receipts.png",
			},
			{
				key: "users",
				label: "Quản lý phiếu chi",
				icon: "/images/Sidebar/TienChi/payment.png",
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
				icon: "/images/Sidebar/DoanhThu/details-sale.png",
			},
			{
				key: "users",
				label: "Doanh thu bán phòng",
				icon: "/images/Sidebar/DoanhThu/room-sale.png",
			},
			{
				key: "users",
				label: "Doanh thu gần đây",
				icon: "/images/Sidebar/DoanhThu/analysis.png",
			},
			// {
			//   key: "users",
			//   label: "Phân tích biểu đồ",
			//   icon: "icon-user",
			// },
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
				icon: "/images/Sidebar/ThongKe/bill.png",
			},
			{
				key: "users",
				label: "Kiểm tra $ tài khoản",
				icon: "/images/Sidebar/ThongKe/checkout.png",
			},
			{
				key: "users",
				label: "Kết quả kinh doanh",
				icon: "/images/Sidebar/ThongKe/business-result.png",
			},
			{
				key: "users",
				label: "Báo cáo",
				icon: "/images/Sidebar/ThongKe/report.png",
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
				icon: "/images/Sidebar/KhachHang/user-hear.png",
			},
			{
				key: "users",
				label: "Khách hàng đặt phòng",
				icon: "/images/Sidebar/KhachHang/user-book.png",
			},
			{
				key: "users",
				label: "Khách hàng theo ngày",
				icon: "/images/Sidebar/KhachHang/user-day.png",
			},
			{
				key: "users",
				label: "Khách hàng để quên",
				icon: "/images/Sidebar/KhachHang/user-forget.png",
			},
			{
				key: "users",
				label: "Danh sách khách hàng",
				icon: "/images/Sidebar/KhachHang/user-forget.png",
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
				icon: "/images/Sidebar/ThongKe/checkout.png",
			},
			{
				key: "users",
				label: "Lịch sử giao ca",
				icon: "/images/Sidebar/Nhanvien/shift-history.png",
			},
			{
				key: "users",
				label: "Quản lý nhân viên",
				icon: "/images/Sidebar/Nhanvien/manager-user.png",
			},
			{
				key: "users",
				label: "Nhóm phân quyền",
				icon: "/images/Sidebar/Nhanvien/permision.png",
			},
		],
	},
	// {
	// 	key: "9",
	// 	label: "Hỗ trợ",
	// 	icon: "/images/Sidebar/HoTro/hotro.png",
	// 	children: [
	// 		{
	// 			key: "users",
	// 			label: "Hướng dẫn sử dụng",
	// 			icon: "icon-user",
	// 		},
	// 		{
	// 			key: "users",
	// 			label: "Gửi hỗ trợ",
	// 			icon: "icon-user",
	// 		},
	// 	],
	// },
];
export default options;
