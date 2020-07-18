import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

FieldInput.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

FieldInput.defaultProps = {
	type: "text",
	label: "",
	placeholder: "",
};

function FieldInput(props) {
	const { field, form, type, label, placeholder } = props;
	const { name } = field;
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];

	return (
		<FormGroup>
			{label && <Label htmlFor={name}>{label}</Label>}

			<Input
				id={name}
				{...field}
				type={type}
				placeholder={placeholder}
				invalid={showError}
			/>
			<ErrorMessage name={name} component={FormFeedback} />
		</FormGroup>
	);
}

export default FieldInput;
