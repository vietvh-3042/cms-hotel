import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";

const { TextArea } = Input;

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
	const { field, form, label } = props;
	const { name } = field;
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];

	return (
		<div className="flex items-center mb-2">
			{label && (
				<label htmlFor={name} className="LabelCo mb-0">
					{label}
				</label>
			)}

			<TextArea
				id={name}
				{...field}
				allowClear
				autoSize={true}
				style={{ width: 226 }}
			/>
		</div>
	);
}

export default TextAreaField;
