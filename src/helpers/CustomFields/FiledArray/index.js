import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

InputFieldArray.propTypes = {
	label: PropTypes.string,
	renderOption: PropTypes.array,
};

InputFieldArray.defaultProps = {
	label: "",
	renderOption: [],
};

function InputFieldArray(props) {
	const { form, label, renderOption, push, remove, name } = props;
	const valueArray = form.values.name;
	console.log(form.values);
	return (
		<fieldset className="mb-3" style={{ border: "1px solid #d0d0d0" }}>
			<legend className="groupHour w-280 mx-auto" onClick={() => push("")}>
				<div className="flex">
					<img src="/images/Common/add16.png" alt="add" className="mr-2" />
					<span>{label}</span>
				</div>
			</legend>
			{/* {valueArray.map((value, index) => (
				<div className="flex justify-center items-center mb-2" key={index}>
					<span className="mr-2">Quá</span>
					<Field
						as="select"
						name={`${valueArray}.${index}.time`}
						style={{ width: 50 }}
						className="focus:outline-none"
					>
						{renderOption()}
					</Field>

					<span className="mx-1">:</span>
					<Field
						name={`${valueArray}.${index}.amount`}
						type="text"
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
			))} */}
		</fieldset>
	);
}

export default InputFieldArray;
