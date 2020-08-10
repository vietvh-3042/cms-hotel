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
			// {
			// 	key: "hotel-diary",
			// 	label: "Nhật ký sử dụng",
			// 	icon: "/images/Sidebar/Hotel/hotel-nhatki.png",
			// },
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
			// {
			// 	key: "price-time",
			// 	label: "Giá theo thời điểm",
			// 	icon: "/images/Sidebar/Settings/price.png",
			// },
		],
	},

	{
		key: "service",
		label: "Dịch vụ & kho",
		icon: "/images/Sidebar/Services/service.png",
		children: [
			{
				key: "type-category",
				label: "Danh sách loại DV",
				icon: "/images/Sidebar/Services/list-service.png",
			},
			{
				key: "list-category",
				label: "Danh sách nhóm DV",
				icon: "/images/Sidebar/Services/list-service.png",
			},
			{
				key: "list-service",
				label: "Danh sách dịch vụ",
				icon: "/images/Sidebar/Services/list-service.png",
			},
			// {
			// 	key: "statistical-service",
			// 	label: "Thống kê DV đã bán",
			// 	icon: "/images/Sidebar/Services/statistical.png",
			// },
		],
	},

	{
		key: "receipts",
		label: "Tiền chi & tiền thu",
		icon: "/images/Sidebar/TienChi/tienchi.png",
		children: [
			{
				key: "paymentMethod",
				label: "Phương thức thanh toán",
				icon: "/images/Sidebar/TienChi/debt.png",
			},
			{
				key: "receipts",
				label: "Quản lý phiếu thu",
				icon: "/images/Sidebar/TienChi/receipts.png",
			},
			// {
			// 	key: "payment",
			// 	label: "Quản lý phiếu chi",
			// 	icon: "/images/Sidebar/TienChi/payment.png",
			// },
		],
	},

	// {
	// 	key: "revenue",
	// 	label: "Doanh thu",
	// 	icon: "/images/Sidebar/DoanhThu/doanhthu.png",
	// 	children: [
	// 		{
	// 			key: "revenue",
	// 			label: "Doanh thu chi tiết",
	// 			icon: "/images/Sidebar/DoanhThu/details-sale.png",
	// 		},
	// 		{
	// 			key: "room-sales",
	// 			label: "Doanh thu bán phòng",
	// 			icon: "/images/Sidebar/DoanhThu/room-sale.png",
	// 		},
	// 		{
	// 			key: "recent-revenue",
	// 			label: "Doanh thu gần đây",
	// 			icon: "/images/Sidebar/DoanhThu/analysis.png",
	// 		},
	// 	],
	// },

	{
		key: "bill",
		label: "Thống kê",
		icon: "/images/Sidebar/ThongKe/thongke.png",
		children: [
			{
				key: "list-bill",
				label: "Danh sách hóa đơn",
				icon: "/images/Sidebar/ThongKe/bill.png",
			},
			// {
			// 	key: "check-money",
			// 	label: "Kiểm tra $ tài khoản",
			// 	icon: "/images/Sidebar/ThongKe/checkout.png",
			// },
			// {
			// 	key: "business-result",
			// 	label: "Kết quả kinh doanh",
			// 	icon: "/images/Sidebar/ThongKe/business-result.png",
			// },
			// {
			// 	key: "users",
			// 	label: "Báo cáo",
			// 	icon: "/images/Sidebar/ThongKe/report.png",
			// },
		],
	},

	{
		key: "customer",
		label: "Khách hàng",
		icon: "/images/Sidebar/KhachHang/khachhang.png",
		children: [
			// {
			// 	key: "users",
			// 	label: "Khách hàng đang ở",
			// 	icon: "/images/Sidebar/KhachHang/user-hear.png",
			// },
			// {
			// 	key: "users",
			// 	label: "Khách hàng đặt phòng",
			// 	icon: "/images/Sidebar/KhachHang/user-book.png",
			// },
			// {
			// 	key: "users",
			// 	label: "Khách hàng theo ngày",
			// 	icon: "/images/Sidebar/KhachHang/user-day.png",
			// },
			// {
			// 	key: "users",
			// 	label: "Khách hàng để quên",
			// 	icon: "/images/Sidebar/KhachHang/user-forget.png",
			// },
			{
				key: "list-customer",
				label: "Danh sách khách hàng",
				icon: "/images/Sidebar/KhachHang/user-forget.png",
			},
		],
	},

	{
		key: "employee",
		label: "Nhân viên",
		icon: "/images/Sidebar/Staff/nhanvien.png",
		children: [
			// {
			// 	key: "users",
			// 	label: "Lịch sử giao tiền",
			// 	icon: "/images/Sidebar/ThongKe/checkout.png",
			// },
			// {
			// 	key: "users",
			// 	label: "Lịch sử giao ca",
			// 	icon: "/images/Sidebar/Staff/shift-history.png",
			// },
			{
				key: "group",
				label: "Quản lý Group",
				icon: "/images/Sidebar/Staff/manager-user.png",
			},
			{
				key: "employee",
				label: "Quản lý nhân viên",
				icon: "/images/Sidebar/Staff/manager-user.png",
			},
			// {
			// 	key: "users",
			// 	label: "Nhóm phân quyền",
			// 	icon: "/images/Sidebar/Staff/permision.png",
			// },
		],
	},
	{
		key: "setting",
		label: "Cài Đặt",
		icon: "/images/Sidebar/Settings/classify.png",
		children: [
			{
				key: "classify",
				label: "Nhóm Nhãn",
				icon: "/images/Sidebar/Staff/shift-history.png",
			},
		],
	},
];
export default options;
