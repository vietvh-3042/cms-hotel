import React from "react";
import { Link } from "react-router-dom";

let arrayData = [
	{
		id: 1,
		img: "new_1.gif",
		title: "Mauris dignissim nunc sit amet lorem rhoncus, sagittis.",
		desc:
			"Morbi molestie sem ac diam luctus, a commodo sem euismod. Curabitur hendrerit lobortis augue, sed condimentum est molestie ac.",
		date: "01/02/2020",
		author: "admin",
	},
	{
		id: 2,
		img: "new_2.gif",
		title: "Mauris dignissim nunc sit amet lorem rhoncus, sagittis.",
		desc:
			"Morbi molestie sem ac diam luctus, a commodo sem euismod. Curabitur hendrerit lobortis augue, sed condimentum est molestie ac.",
		date: "01/02/2020",
		author: "admin",
	},
	{
		id: 3,
		img: "new_3.gif",
		title: "Mauris dignissim nunc sit amet lorem rhoncus, sagittis.",
		desc:
			"Morbi molestie sem ac diam luctus, a commodo sem euismod. Curabitur hendrerit lobortis augue, sed condimentum est molestie ac.",
		date: "01/02/2020",
		author: "admin",
	},
	{
		id: 4,
		img: "new_4.gif",
		title: "Mauris dignissim nunc sit amet lorem rhoncus, sagittis.",
		desc:
			"Morbi molestie sem ac diam luctus, a commodo sem euismod. Curabitur hendrerit lobortis augue, sed condimentum est molestie ac.",
		date: "01/02/2020",
		author: "admin",
	},
];

SectionNew.propTypes = {};

function SectionNew(props) {
	function handleClick(e) {
		e.preventDefault();
	}
	return (
		<section className="section-new">
			<div className="container">
				<div className="module module-new">
					<div className="module-header">
						<h2 className="title medium">Tin tức từ Maamul</h2>
						<p className="p__info light">
							Tin tức nổi bật mà Maamul muốn chia sẻ tới tất cả khách hàng
						</p>
					</div>
					<div className="module-content">
						<div className="row">
							{arrayData.map((value) => (
								<div
									className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
									key={value.id}
								>
									<div className="new">
										<div className="new-img">
											<Link
												className="new__link"
												to={`/blogs/detail/${value.id}`}
												onClick={handleClick}
											/>
											<img
												className="img__link"
												src={`images/Home/${value.img}`}
												alt={value.img}
											/>
										</div>
										<div className="new-content">
											<h3 className="new-title medium">
												<Link
													className="new__link"
													to={`/blogs/detail/${value.id}`}
													onClick={handleClick}
												>
													{value.title}
												</Link>
											</h3>
											<p className="p__desc">{value.desc}</p>
											<p className="p__time">
												<i className="fas fa-calendar-day"></i>
												<span className="span__day">{value.date} -</span>
												<span className="span__name">{value.author}</span>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SectionNew;
