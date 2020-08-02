import PropTypes from "prop-types";
import React from "react";
import { Field } from "formik";

TextAreaField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
};

TextAreaField.defaultProps = {
	label: "",
};

function TextAreaField(props) {
	const { field, label, width } = props;
	const { name } = field;

	return (
		<div className="flex items-center mb-2">
			{label && (
				<label htmlFor={name} className="LabelCo mb-0">
					{label}
				</label>
			)}
			<Field
				id={name}
				{...field}
				as="textarea"
				rows="3"
				style={{ width: width ? width : 220, display: "inline" }}
				className="dashboard"
			/>
		</div>
	);
}

export default TextAreaField;
