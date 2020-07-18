import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

SectionFeedback.propTypes = {};

let arrayData = [
	{
		id: 1,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 2,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 3,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 4,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 5,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 6,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 7,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
	{
		id: 8,
		message:
			"Duis sit amet semper mi. Curabitur pretium nec ipsum ac malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum placerat",
		name: "Phạm Mai Lan",
		position: "Trưởng phòng chăm sóc khách hàng tại KS Nulla",
		linkImg: "avata_1.gif",
	},
];

function SectionFeedback(props) {
	let settings = {
		slidesToShow: 3,
		centerMode: true,
		centerPadding: "10",
		rows: 1,
		infinite: true,
		dots: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 557.98,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
				},
			},
		],
	};
	return (
		<section className="section-feedback">
			<div className="module module-feedback">
				<div className="module-header">
					<h2 className="title medium">Phản hồi từ phía khách hàng</h2>
					<p className="p__info light">
						Tất cả những gì bạn cần để quản lý và kinh doanh khách sạn
					</p>
				</div>
				<div className="module-content">
					<Slider {...settings}>
						{arrayData.map((value) => (
							<div className="item" key={value.id}>
								<div className="box">
									<p className="p__text light">{value.message}</p>
									<div className="content">
										<div className="avata">
											<img
												src={`images/Home/${value.linkImg}`}
												alt={value.linkImg}
											/>
										</div>
										<div className="info">
											<h3 className="name medium">{value.name}</h3>
											<p className="p__message light">{value.position}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</Slider>
				</div>
			</div>
		</section>
	);
}

export default SectionFeedback;
