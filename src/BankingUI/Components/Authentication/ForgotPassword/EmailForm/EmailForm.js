import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const EmailForm = ({
	formVariables,
	setFormVariables,
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
			setFormVariables({ ...formVariables, isLoading: true });
			await axios
				.post(`/api/auth/forgot-password`, {
					email: formVariables.email,
				})
				.then((result) => {
					console.log(result);
					if (result.status === 200) {
						setStep(1);
						setFormError(null, result.data.message);
					}
				})
				.catch((err) => {
					console.log(err.response);
					if (err.status === 404) {
						setFormError(true, "This email doesn't exist. Please try again!");
					} else setFormError(true, "Something's wrong. Please try again!");
				});

			setFormVariables({ ...formVariables, isLoading: false });
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
				<Form.Label className="font-weight-bold">Email</Form.Label>
				<Form.Control
					required
					type="email"
					name="email"
					placeholder="Enter your Email"
					value={formVariables.email}
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
				{formVariables.isLoading ? (
					<>
						<Spinner animation="border" size="sm" /> Waiting...
					</>
				) : (
					"Add email"
				)}
			</Button>
		</Form>
	);
};

export default EmailForm;
