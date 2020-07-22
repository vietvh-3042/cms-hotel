import PropTypes from "prop-types";
import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";

InputField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
};

InputField.defaultProps = {
	type: "text",
	label: "",
};

function InputField(props) {
	const { field, form, type, label, width } = props;
	const { name } = field;
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];

	return (
		<FormGroup className="mb-2">
			{label && (
				<Label htmlFor={name} className="LabelCo mb-0">
					{label}
				</Label>
			)}

			<Input
				id={name}
				{...field}
				type={type}
				style={{ width: width ? width : 220, height: 24, display: "inline" }}
				className="dashboard"
				invalid={showError}
			/>
			<ErrorMessage
				name={name}
				component={FormFeedback}
				className="custom-err"
			/>
		</FormGroup>
	);
}

export default InputField;
