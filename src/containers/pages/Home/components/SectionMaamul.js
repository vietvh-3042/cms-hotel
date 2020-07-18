import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let arrayData = [
	{ id: 1, linkImg: "maamul_1.gif" },
	{ id: 2, linkImg: "maamul_2.gif" },
	{ id: 3, linkImg: "maamul_3.gif" },
	{ id: 4, linkImg: "maamul_4.gif" },
	{ id: 5, linkImg: "maamul_5.gif" },
	{ id: 6, linkImg: "maamul_6.gif" },
];

SectionMaamul.propTypes = {};

function SectionMaamul(props) {
	let settings = {
		slidesToShow: 6,
		slidesToScroll: 5,
		rows: 1,
		infinite: false,
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow />,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 4,
					infinite: true,
				},
			},
			{
				breakpoint: 557.98,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
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
		<section className="section-maamul">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-md-12">
						<div className="module module-maamul">
							<div className="module-header">
								<h2 className="title light">Tìm hiểu về phần mềm Maamul</h2>
								<p className="p__info light">
									Aliquam quis neque eu sem molestie fermentum eu quis justo.
									Phasellus cursus, erat et elementum malesuada, turpis quam
									malesuada felis, ac elementum leo justo ac ante. Mauris
									blandit augue vitae odio vehicula, placerat hendrerit mi
									elementum. Fusce a lorem lacus. Sed bibendum metus a erat
									sollicitudin consectetur. Duis maximus vitae nulla et
									faucibus. Cras accumsan erat sit amet turpis ultricies
									interdum. Nullam finibus est dolor, vel sagittis tortor
									placerat non. Nam dictum, sapien ac cursus imperdiet, nunc
									ipsum mattis metus, sed pulvinar eros magna nec est.
								</p>
							</div>
							<div className="module-content">
								<Slider {...settings}>
									{arrayData.map((value) => (
										<div className="item" key={value.id}>
											<img
												className="img__link"
												src={`images/Home/${value.linkImg}`}
												alt={value.linkImg}
											/>
										</div>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionMaamul;
