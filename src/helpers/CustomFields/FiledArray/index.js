import PropTypes from "prop-types";
import React from "react";
import { Field } from "formik";

FiledArrayCustom.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	titleArray: PropTypes.string,
	keyArray: PropTypes.object,
	keyArrayText: PropTypes.string,
	array: PropTypes.array,
	renderOption: PropTypes.func,
};

FiledArrayCustom.defaultProps = {
	name: "",
	label: "",
	titleArray: "",
	array: [],
	renderOption: null,
	keyArray: { time: "1", amount: "50000" },
	keyArrayText: "time",
};
function FiledArrayCustom(props) {
	const {
		push,
		remove,
		name,
		label,
		titleArray,
		keyArray,
		keyArrayText,
		array,
		renderOption,
	} = props;

	return (
		<fieldset className="mb-3" style={{ border: "1px solid #d0d0d0" }}>
			<legend className="groupHour w-280 mx-auto" onClick={() => push(keyArray)}>
				<div className="flex">
					<img src="/images/Common/add16.png" alt="add" className="mr-2" />
					<span>{label}</span>
				</div>
			</legend>
			{array.map((value, index) => (
				<div className="flex justify-center items-center mb-2" key={index}>
					<span className="mr-2">{titleArray}</span>
					<Field
						as="select"
						name={`${name}.${index}.${keyArrayText}`}
						style={{ width: 50 }}
						className="focus:outline-none"
					>
						{renderOption()}
					</Field>

					<span className="mx-1">:</span>
					<Field
						name={`${name}.${index}.amount`}
						className="focus:outline-none font-extrabold"
						style={{ width: 150 }}
					/>
					<img
						src="/images/Common/cancel20.png"
						alt="add"
						className="ml-1"
						onClick={() => remove(index)}
					/>
				</div>
			))}
		</fieldset>
	);
}

export default FiledArrayCustom;
