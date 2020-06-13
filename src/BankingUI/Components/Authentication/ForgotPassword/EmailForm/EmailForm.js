import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const EmailForm = ({
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
				setStep(1);
				setFormError(null);
			} else {
				setFormError("This email doesn't exist. Please try again!");
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
				<Form.Label className="font-weight-bold">Email</Form.Label>
				<Form.Control
					required
					type="email"
					name="email"
					placeholder="Enter your Email"
					value={resetPasswordForm.email}
					onChange={(e) => handleChange(e)}
				/>
				<Form.Text className="text-muted">
					We will send your OTP password to this email.
				</Form.Text>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please provide a valid username.
				</Form.Control.Feedback>
				<Form.Text className="mt-2">
					<Link to="/login">Go back to Login screen!</Link>
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit" className="mt-3">
				Get OTP code.
			</Button>
		</Form>
	);
};

export default EmailForm;
