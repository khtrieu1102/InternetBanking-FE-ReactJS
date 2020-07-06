import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const OtpForm = ({
	formVariables,
	setFormVariables,
	step,
	setStep,
	setFormError,
	history,
}) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (
			form.checkValidity() === false ||
			formVariables.retypeNewPassword !== formVariables.newPassword
		) {
			event.stopPropagation();
		} else {
			await axios
				.post(`/api/auth/verify-forgot-password`, {
					code: formVariables.otp,
					email: formVariables.email,
					newPassword: formVariables.newPassword,
				})
				.then((result) => {
					if (result.status === 200) {
						setFormError(null, result.data.message);
						setTimeout(() => {
							setStep(2);
						}, 5000);
					}
				})
				.catch((err) => {
					if (err.status === 404) {
						setFormError(true, "Something's wrong");
					} else setFormError(true, "Something's wrong");
				});
			// if (false) {
			// 	setStep(2);
			// } else {
			// 	setFormError("This OTP Code is invalid. Please try again!");
			// }
		}
		setValidated(true);
	};

	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
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
					value={formVariables.otp}
					onChange={(e) => handleChange(e)}
				/>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please provide us your received OTP code.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Label className="font-weight-bold">Your new password</Form.Label>
				<Form.Control
					required
					type="password"
					name="newPassword"
					placeholder=""
					value={formVariables.newPassword}
					onChange={(e) => handleChange(e)}
				/>
				<Form.Text className="text-muted">This is your new password.</Form.Text>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Retype password doesn't match.
				</Form.Control.Feedback>
				<Form.Label className="font-weight-bold">
					Retype your new password
				</Form.Label>
				<Form.Control
					required
					type="password"
					name="retypeNewPassword"
					placeholder=""
					value={formVariables.retypeNewPassword}
					onChange={(e) => handleChange(e)}
					isInvalid={
						formVariables.retypeNewPassword !== formVariables.newPassword
					}
				/>
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
