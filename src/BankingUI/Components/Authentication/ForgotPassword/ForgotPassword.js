import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import EmailForm from "./EmailForm/EmailForm";
import OtpForm from "./OtpForm/OtpForm";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";
import AlertBox from "../../Others/AlertBox/AlertBox";

const ForgotPassword = (props) => {
	const { reducerAuthorization } = props;
	const { isAuthenticated } = reducerAuthorization;
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [resetPasswordForm, setResetPasswordForm] = useState({
		email: "",
		otp: null,
		newPassword: "",
		retypeNewPassword: "",
		error: null,
	});
	const [step, setStep] = useState(0);
	const [validated, setValidated] = useState(false);

	const from = props.location.state || { from: { pathname: "/" } };

	useEffect(() => {
		setRedirectToReferrer(isAuthenticated ? true : false);
	}, [isAuthenticated]);

	const setFormError = (message) => {
		resetPasswordForm["error"] = message;
		setResetPasswordForm({ ...resetPasswordForm });
	};

	const renderAlert = () => {
		if (resetPasswordForm.error)
			return (
				<AlertBox alertTypes="danger" alertMessage={resetPasswordForm.error} />
			);
	};

	const renderStepForm = () => {
		switch (step) {
			case 0:
				return (
					<EmailForm
						resetPasswordForm={resetPasswordForm}
						setResetPasswordForm={setResetPasswordForm}
						step={step}
						setStep={setStep}
						setFormError={setFormError}
					/>
				);
			case 1:
				return (
					<OtpForm
						resetPasswordForm={resetPasswordForm}
						setResetPasswordForm={setResetPasswordForm}
						step={step}
						setStep={setStep}
						setFormError={setFormError}
					/>
				);
			case 2:
				return (
					<ResetPasswordForm
						resetPasswordForm={resetPasswordForm}
						setResetPasswordForm={setResetPasswordForm}
						step={step}
						setStep={setStep}
						setFormError={setFormError}
					/>
				);
			case 3:
				return <Redirect to="/login" />;
		}
	};

	return redirectToReferrer ? (
		<Redirect to={from} />
	) : (
		<Row className="justify-content-md-center">
			<Col xs={10} md={6}>
				<Card border="primary" className="mt-3">
					<Card.Header>
						<Card.Title className="text-center text-dark">
							RESET PASSWORD
						</Card.Title>
					</Card.Header>
					<Card.Body>
						{renderAlert()}
						{renderStepForm()}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default ForgotPassword;
