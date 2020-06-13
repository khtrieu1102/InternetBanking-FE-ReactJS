import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = (props) => {
	const { reducerAuthorization } = props;
	const { isAuthenticated } = reducerAuthorization;
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [messageForm, setMessageForm] = useState({
		email: "",
	});
	const [validated, setValidated] = useState(false);

	const from = props.location.state || { from: { pathname: "/" } };

	useEffect(() => {
		setRedirectToReferrer(isAuthenticated ? true : false);
	}, [isAuthenticated]);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			// await axios
			// 	.post("http://localhost:5000/api/auth/login", {
			// 		username: messageForm.username,
			// 		password: messageForm.password,
			// 	})
			// 	.then((result) => {
			// 		if (result.status === 200) {
			// 			console.log(result);
			// 			localStorage.setItem("token", result.data.accessToken);
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
			// const accessToken = localStorage.getItem("token");
			// if (accessToken) setUserAccessToken(accessToken);
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
						<Card.Title className="text-center text-dark">
							RESET PASSWORD
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicUsername">
								<Form.Label className="font-weight-bold">Email</Form.Label>
								<Form.Control
									required
									type="email"
									name="email"
									placeholder="Enter your Email"
									value={messageForm.email}
									onChange={(e) => handleChange(e)}
								/>
								<Form.Text className="text-muted">
									We will send your OTP password to this email.
								</Form.Text>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please provide a valid username.
								</Form.Control.Feedback>
							</Form.Group>
							<Link to="/login">
								<Button
									variant="primary-outline"
									type="button"
									className="mt-3"
								>
									<FontAwesomeIcon icon={faBackward} />
									Login
								</Button>
							</Link>
							<Button variant="primary" type="submit" className="mt-3">
								Send
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default ForgotPassword;
