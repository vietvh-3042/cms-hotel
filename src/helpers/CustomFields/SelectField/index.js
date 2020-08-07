import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

SelectField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	array: PropTypes.array,
};

SelectField.defaultProps = {
	label: "",
	array: [],
};

function SelectField(props) {
	const { field, form, label, width, array } = props;
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
				type="select"
				style={{ width: width ? width : 220, height: 24, display: "inline" }}
				className="dashboard"
				invalid={showError}
			>
				{array.map((value) => (
					<option value={value.id} key={value.id}>
						{value.name}
					</option>
				))}
			</Input>
			<ErrorMessage
				name={name}
				component={FormFeedback}
				className="custom-err"
			/>
		</FormGroup>
	);
}

export default SelectField;
