import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

let arrayData = [
	{
		id: 1,
		title: "Giao ca, giao tiền",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 2,
		title: "Quản lý được nhiều KS",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 3,
		title: "Giao ca, giao tiền",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 4,
		title: "Quản lý được nhiều KS",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 5,
		title: "Giao ca, giao tiền",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 6,
		title: "Quản lý được nhiều KS",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
	{
		id: 7,
		title: "Giao ca, giao tiền",
		info: "Aliquam quis neque eu sem molestie fermentum eu quis justo",
	},
];

SectionHighlights.propTypes = {};

function SectionHighlights(props) {
	let settings = {
		slidesToShow: 4,
		rows: 2,
		infinite: true,
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow />,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 557.98,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					rows: 1,
				},
			},
		],
	};

	function SampleNextArrow() {
		return (
			<i className="fas fa-chevron-left slick-arrow" aria-hidden="true"></i>
		);
	}

	function SamplePrevArrow() {
		return (
			<i className="fas fa-chevron-right slick-arrow" aria-hidden="true"></i>
		);
	}

	return (
		<section className="section-highlights">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="module module-highlights">
							<div className="module-header">
								<h2 className="title medium">Tính năng nổi bật</h2>
								<p className="p__info light">
									Tất cả những gì bạn cần để quản lý và kinh doanh khách sạn
								</p>
							</div>
							<div className="module-content">
								<Slider {...settings}>
									<div className="item">
										<div className="box">
											<div className="content">
												<h3 className="title bold">Giao ca, giao tiền</h3>
												<p className="p__info">
													Aliquam quis neque eu sem molestie fermentum eu quis
													justo
												</p>
											</div>
										</div>
									</div>
									{arrayData.map((value) => (
										<div className="item" key={value.id}>
											<div className="box">
												<div className="content">
													<h3 className="title bold">{value.title}</h3>
													<p className="p__info">{value.info}</p>
												</div>
											</div>
										</div>
									))}
								</Slider>
								<Link to="#" className="a__link black">
									Dùng thử miễn phí
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionHighlights;
