import React from "react";

SectionBanner.propTypes = {};

function SectionBanner() {
	let arrayData = [
		{
			id: 1,
			info_1: "Nền tảng quản lý & kinh doanh khách sạn",
			title: "Có thị phần số 1 Việt Nam",
			info_2:
				" Vestibulum vitae mi ornare, luctus risus ullamcorper, dictumeros. Aenean vel accumsan nisi. Vestibulum pretium lacus in nibhconvallis, vel accumsan velit sodales",
			imgLink: "slide-home_1.png",
			linkUrl: "https://www.facebook.com/",
		},
	];
	return (
		<section className="section-banner">
			{arrayData.map((value) => (
				<div key={value.id}>
					<img
						className="img__link"
						src={`/images/Home/${value.imgLink}`}
						alt={value.imgLink}
					/>
					<div className="item">
						<div className="container">
							<div className="module module-banner">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 cl-xl-8">
										<div className="module-header">
											<p className="p__info light">{value.info_1}</p>
											<h2 className="title black">{value.title}</h2>
											<p className="p__info_2 medium">{value.info_2}</p>
											<a
												className="a__link black"
												href={value.linkUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												Dùng thử miễn phí
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}

export default SectionBanner;
