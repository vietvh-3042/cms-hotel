import React from "react";

PDF.propTypes = {};

function PDF(props) {
	const { pdfExportComponent, inforCheckout } = props;

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function totalRoom(value) {
		let listPrice = [];
		value.map((val) => {
			for (let total of Object.values(val)) {
				listPrice.push(total);
			}
		});
		return format_current(
			listPrice.reduce((accumulator, currentValue) => accumulator + currentValue)
		);
	}

	function renderListTime(value) {
		return value.map((val, key) => (
			<React.Fragment key={key}>
				<div className="timerange text-checkin-pdf" style={{ width: 250 }}>
					{Object.keys(val)[0]}
				</div>
				<div className="money text-checkin-pdf">{`[${format_current(
					Object.values(val)[0]
				)}]`}</div>
			</React.Fragment>
		));
	}

	function renderListService(value) {
		return value.map((val, key) => (
			<div key={key} className="flex justify-between w-full">
				<div className="timerange text-checkin-pdf" style={{ width: 250 }}>
					{Object.keys(val)[0]}
				</div>
				<div className="text-checkin-pdf quantity">
					{Object.values(val)[0].price}
					<span className="ml-2">X</span>
				</div>
				<div className="text-checkin-pdf quantity">
					{Object.values(val)[0].quantity}
				</div>
				<div className="money text-checkin-pdf">{`[${format_current(
					Object.values(val)[0].amount
				)}]`}</div>
			</div>
		));
	}

	return (
		<div className="absolute top-0 opacity-0" style={{ left: "-10000px" }}>
			<div className="PrintSection" ref={pdfExportComponent}>
				<div className="text-title ">
					{inforCheckout ? `Hóa Đơn ${inforCheckout.room.name} (tạm tính)` : ""}
				</div>
				<div className="text-title-name">Khách sạn HaNoi Hotel</div>
				<div className="grid grid-cols-2 mb-2 row-gap-2">
					{/* infor hoa don */}
					<div className="checkout-item justify-start">
						<img
							src="/images/Common/khachhang.png"
							alt="khachhang"
							className="inline-block"
						/>
						<span className="text-checkin-pdf">Khách hàng:</span>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ width: 170 }}
						>
							{inforCheckout ? inforCheckout.customer.name : ""}
						</span>
					</div>
					<div className="checkout-item justify-end">
						<span className="text-checkin-pdf">Mã HĐ:</span>
						<span className="text-bold text-checkin-pdf text-value">
							{inforCheckout ? inforCheckout.bill_code : ""}
						</span>
					</div>
					<div className="checkout-item justify-start">
						<span className="text-checkin-pdf">Vào lúc:</span>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ width: 150 }}
						>
							{inforCheckout ? inforCheckout.check_in : ""}
						</span>
					</div>
					<div className="checkout-item justify-end">
						<span className="text-checkin-pdf">Trả lúc:</span>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ width: 150 }}
						>
							{inforCheckout ? inforCheckout.check_out : ""}
						</span>
					</div>
					<div className="checkout-item justify-start">
						<span className="text-checkin-pdf">Loại phòng:</span>
						<span className="text-bold text-checkin-pdf text-value">
							{inforCheckout ? inforCheckout.room.type_room : ""}
						</span>
					</div>

					<div className="split col-span-2"></div>
				</div>
				<div className="grid grid-cols-2 mb-2">
					<div className="checkout-item col-span-2 justify-start">
						<div className="text-checkin-pdf text-left" style={{ width: 160 }}>
							<img
								src="/images/Common/moneyRoom.png"
								alt="moneyRoom"
								className="inline-block mr-2"
							/>
							<span>Tiền phòng:</span>
						</div>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ fontSize: 24 }}
						>
							{inforCheckout ? totalRoom(inforCheckout.room.bill_price_room) : ""}
						</span>
					</div>
					<div className="mt-1 flex justify-between col-span-2 flex-wrap">
						{inforCheckout ? renderListTime(inforCheckout.room.bill_price_room) : ""}
					</div>
					<div className="split mt-2 col-span-2"></div>
				</div>
				<div className="grid grid-cols-2 mb-2">
					<div className="checkout-item col-span-2">
						<div className="text-checkin-pdf text-left" style={{ width: 165 }}>
							<img
								src="/images/Common/addService.png"
								alt="addService"
								className="inline-block mr-2"
							/>
							<span>Tiền dịch vụ:</span>
						</div>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ fontSize: 24 }}
						>
							{inforCheckout
								? format_current(inforCheckout.room.service_use.total)
								: ""}
						</span>
					</div>
					<div className="mt-1 flex justify-between col-span-2 flex-wrap">
						{inforCheckout
							? renderListService(inforCheckout.room.service_use.detail)
							: ""}
					</div>
					<div className="split mt-2 col-span-2"></div>
				</div>
				<div className="checkout-item mt-3 justify-start">
					<div>
						<div className="text-checkin-pdf text-right">Phụ thu:</div>
						<input
							className="border border-black pl-2"
							style={{ width: 80, fontWeight: "bold" }}
						/>
					</div>
					<div>
						<div className="text-checkin-pdf text-right">Giảm trừ:</div>
						<input
							className="border border-black pl-2"
							style={{ width: 80, fontWeight: "bold" }}
						/>
					</div>
					<div>
						<div className="text-checkin-pdf text-right">Trả trước:</div>
						<input
							value={inforCheckout ? inforCheckout.prepayment : ""}
							disabled
							className="border border-black pl-2"
							style={{ width: 80, fontWeight: "bold" }}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 mb-2 mt-3">
					<div className="checkout-item justify-start">
						<div className="text-checkin-pdf text-left" style={{ width: 165 }}>
							<img
								src="/images/Common/caculator.png"
								alt="caculator"
								className="inline-block mr-2"
							/>
							<span>Thanh toán:</span>
						</div>
						<span
							className="text-bold text-checkin-pdf text-value"
							style={{ fontSize: 24 }}
						>
							{format_current(inforCheckout ? inforCheckout.total_bill_payment : "")}
						</span>
					</div>
				</div>

				<div className="border-dashed border border-black mt-3"></div>

				<div className="mt-4 grid grid-cols-2">
					<div className="footer-pdf">Chữ ký nhân viên</div>
					<div className="footer-pdf">chữ ký khách hàng</div>
				</div>
			</div>
		</div>
	);
}

export default PDF;
