import React from "react";

export function renderPerson() {
	let data = [];
	for (let index = 1; index <= 10; index++) {
		data.push(index);
	}
	return data.map((value, index) => (
		<option value={value} key={index} className="focus:outline-none">
			{value} N
		</option>
	));
}

export function renderHour() {
	let data = [];
	for (let index = 1; index <= 24; index++) {
		data.push(index);
	}
	return data.map((value, index) => (
		<option value={value} key={index} className="focus:outline-none">
			{value}h
		</option>
	));
}

export function renderQuantity() {
	let data = [];
	for (let index = 1; index <= 100; index++) {
		data.push(index);
	}
	return data.map((value, index) => (
		<option value={value} key={index} className="focus:outline-none">
			{value}
		</option>
	));
}
