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
	return <div></div>;
}

export default InputFieldArray;
