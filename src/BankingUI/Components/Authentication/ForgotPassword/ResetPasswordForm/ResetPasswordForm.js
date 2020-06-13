import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const ResetPasswordForm = ({
	resetPasswordForm,
	setResetPasswordForm,
	step,
	setStep,
	setFormError,
}) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			if (true) {
				setStep(3);
			}
		}
		setValidated(true);
	};

	const handleChange = (e) => {
		resetPasswordForm[e.target.name] = e.target.value;
		setResetPasswordForm({ ...resetPasswordForm });
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicUsername">
				<Form.Label className="font-weight-bold">Your new password</Form.Label>
				<Form.Control
					required
					type="password"
					name="newPassword"
					placeholder=""
					value={resetPasswordForm.newPassword}
					onChange={(e) => handleChange(e)}
				/>
				<Form.Text className="text-muted">This is your new password.</Form.Text>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please provide a valid OTP.
				</Form.Control.Feedback>
				<Form.Label className="font-weight-bold">
					Retype your new password
				</Form.Label>
				<Form.Control
					required
					type="password"
					name="retypeNewPassword"
					placeholder=""
					value={resetPasswordForm.retypeNewPassword}
					onChange={(e) => handleChange(e)}
					isInvalid={
						resetPasswordForm.retypeNewPassword !==
						resetPasswordForm.newPassword
					}
				/>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please provide a valid OTP.
				</Form.Control.Feedback>
				<Form.Text className="mt-2">
					<Link to="/login">Go back to Login screen!</Link>
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit" className="mt-3">
				Reset Password
			</Button>
		</Form>
	);
};

export default ResetPasswordForm;
