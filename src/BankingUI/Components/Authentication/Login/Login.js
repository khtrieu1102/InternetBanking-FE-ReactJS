import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const LogIn = (props) => {
	const { isAuthenticated } = props;
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [messageForm, setMessageForm] = useState({});
	const { username, password } = messageForm;
	const [validated, setValidated] = useState(false);
	const reCaptchaRef = React.createRef();

	const from = props.location.state || { from: { pathname: "/" } };

	useEffect(() => {
		setRedirectToReferrer(isAuthenticated ? true : false);
	}, [isAuthenticated]);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		// const reCaptchaValue = reCaptchaRef.current.getValue();
		const reCaptchaValue = true;
		event.preventDefault();
		if (form.checkValidity() === false || !reCaptchaValue) {
			event.stopPropagation();
		} else {
			console.log(username, password);
		}
		setValidated(true);
	};

	const handleChange = (e) => {
		messageForm[e.target.name] = e.target.value;
		setMessageForm({ ...messageForm });
	};

	return redirectToReferrer ? (
		<Redirect to={from} />
	) : (
		<Row className="justify-content-md-center">
			<Col xs={10} md={6}>
				<Card border="primary" className="mt-3">
					<Card.Header>
						<Card.Title className="text-center text-dark">LOG IN</Card.Title>
					</Card.Header>
					{/* {error ? (
						<MessageBox
							alertTypes="danger"
							alertHeading={message}
							alertMessage={error}
						/>
					) : null} */}
					<Card.Body>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicUsername">
								<Form.Label className="font-weight-bold">Username</Form.Label>
								<Form.Control
									required
									type="email"
									name="username"
									placeholder="Enter Username"
									value={username}
									onChange={(e) => handleChange(e)}
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please provide a valid username.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label className="font-weight-bold">Password</Form.Label>
								<Form.Control
									required
									type="password"
									name="password"
									placeholder="Password"
									value={password}
									onChange={(e) => handleChange(e)}
								/>
								<Form.Control.Feedback type="invalid">
									Please provide a valid password.
								</Form.Control.Feedback>
							</Form.Group>
							<ReCAPTCHA
								ref={reCaptchaRef}
								sitekey="6LeTv_QUAAAAAF65I5hEKOF7PuE1JUxYcQ4JMBrb"
							/>
							{/* <Form.Group controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Remember me!" />
							</Form.Group> */}
							<Button variant="primary" type="submit" className="mt-3">
								Submit
								{/* {isLoading ? <Spinner animation="border" size="sm" /> : null} */}
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default LogIn;
