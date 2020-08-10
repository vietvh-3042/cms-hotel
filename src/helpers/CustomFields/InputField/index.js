import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	visible: PropTypes.bool,
	placeholder: PropTypes.string,
};

InputField.defaultProps = {
	type: "text",
	label: "",
	width: null,
	visible: false,
	placeholder: "",
};

function InputField(props) {
	const { field, form, type, label, width, visible, placeholder } = props;
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
				style={{
					width: width ? width : 220,
					height: 24,
					display: "inline",
				}}
				placeholder={placeholder}
				disabled={visible}
				className="dashboard"
				invalid={showError}
			/>
			<ErrorMessage name={name} component={FormFeedback} className="custom-err" />
		</FormGroup>
	);
}

export default InputField;
