import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const OtpForm = (props) => {
	const {
		formVariables,
		setFormVariables,
		accessToken,
		setStep,
		balance,
		setFormError,
	} = props;
	const [validated, setValidated] = useState(false);

	// Update giá trị điền vào Form
	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
	};

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (
			form.checkValidity() === false ||
			formVariables.name == "" ||
			formVariables.name == "KHONG TIM THAY"
		) {
			event.stopPropagation();
		} else {
			await axios
				.post(
					"/api/transaction/verify-code",
					{
						code: formVariables.otp,
					},
					{
						headers: {
							transactionId: formVariables.transactionId,
						},
					}
				)
				.then((result) => {
					console.log(result);
					setFormVariables({ ...formVariables, isLoading: false });
					if (result.status === 200) {
						setStep(4);
						setFormError(null, "");
					}
				})
				.catch((err) => {
					console.log(err.response);
					err.response && err.response.message
						? setFormError(true, err.response.data.message)
						: setFormError(true, "Something's wrong, please try again!");
				});
		}
		setValidated(true);
	};

	return (
		<>
			<h5>Step 3: Send your OTP received from mail</h5>
			<hr />
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group>
					<p>
						You're about to send {formVariables.amount} to user{" "}
						<span>{formVariables.name}</span>
					</p>
					<Form.Text className="text-muted font-weight-bold">
						OTP Code
					</Form.Text>
					<Form.Control
						required
						type="text"
						name="otp"
						value={formVariables.otp}
						onChange={(e) => handleChange(e)}
						isInvalid={formVariables.otp === ""}
					/>
					<Form.Control.Feedback type="invalid">
						Give your receiver a message to know
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit">
					Next
				</Button>
				<Button
					variant="primary-outline"
					type="button"
					onClick={() => setStep(2)}
				>
					<FontAwesomeIcon icon={faBackward} /> Back
				</Button>
			</Form>
		</>
	);
};

export default OtpForm;
