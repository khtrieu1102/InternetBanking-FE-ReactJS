import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const OtpForm = ({
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
			if (false) {
				setStep(2);
			} else {
				setFormError("This OTP Code is invalid. Please try again!");
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
				<Form.Label className="font-weight-bold">
					Your received OTP code
				</Form.Label>
				<Form.Control
					required
					type="text"
					name="otp"
					placeholder=""
					value={resetPasswordForm.otp}
					onChange={(e) => handleChange(e)}
				/>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Retype password doesn't match.
				</Form.Control.Feedback>
				<Form.Text className="mt-2">
					<Link to="/login">Go back to Login screen!</Link>
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit" className="mt-3">
				Confirm
			</Button>
			<Button
				variant="primary-outline"
				type="button"
				className="mt-3"
				onClick={() => setStep(0)}
			>
				<FontAwesomeIcon icon={faBackward} /> Add email
			</Button>
		</Form>
	);
};

export default OtpForm;
