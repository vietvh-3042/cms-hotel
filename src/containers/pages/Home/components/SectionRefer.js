import React from "react";
import PropTypes from "prop-types";

let arrayData = [
	{ id: 1, linkImg: "refer_1.gif" },
	{ id: 2, linkImg: "refer_2.gif" },
	{ id: 3, linkImg: "refer_3.gif" },
	{ id: 4, linkImg: "refer_4.gif" },
	{ id: 5, linkImg: "refer_5.gif" },
	{ id: 6, linkImg: "refer_6.gif" },
	{ id: 7, linkImg: "refer_7.gif" },
	{ id: 8, linkImg: "refer_8.gif" },
	{ id: 9, linkImg: "refer_9.gif" },
	{ id: 10, linkImg: "refer_10.gif" },
	{ id: 11, linkImg: "refer_11.gif" },
	{ id: 12, linkImg: "refer_12.gif" },
];

SectionRefer.propTypes = {};

function SectionRefer(props) {
	return (
		<section className="section-refer">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="module module-refer">
							<div className="module-header">
								<h2 className="title light">
									Tham khảo hình ảnh của PM Maamul
								</h2>
							</div>
							<div className="module-content">
								<div className="row">
									{arrayData.map((value) => (
										<div
											key={value.id}
											className="col-xs-6 col-sm-6 col-md-4 col-lg-3"
										>
											<div className="item">
												<img
													className="item-img__link"
													src={`images/Home/${value.linkImg}`}
													alt={value.linkImg}
												/>
											</div>
										</div>
									))}
									<div className="view">
										<a className="view__link">
											<i className="fas fa-chevron-down"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionRefer;
