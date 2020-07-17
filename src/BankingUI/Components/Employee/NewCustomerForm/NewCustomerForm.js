import React, { useState, useEffect } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";

const NewCustomerForm = (props) => {
	const { reducerAuthorization } = props;
	const { accessToken } = reducerAuthorization.authentication;
	const [validated, setValidated] = useState(false);

	const [formVariables, setFormVariables] = useState({
		accountNumber: "",
		balance: 50000,
		username: "",
		name: "",
		phone: "",
		email: "",
		role: "customer",
		status: true,
		password: "",
		message: "",
		error: "",
	});

	const renderAlert = () => {
		if (formVariables.message)
			return (
				<AlertBox
					alertTypes={formVariables.error}
					alertMessage={formVariables.message}
				/>
			);
	};

	const setFormError = (error, message) => {
		let alertTypes = error === null ? "success" : "danger";

		formVariables["error"] = alertTypes;
		setFormVariables({ ...formVariables });

		formVariables["message"] = message;
		setFormVariables({ ...formVariables });
	};

	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			console.log(formVariables);
			axios
				.post("/api/users", {
					accountNumber: formVariables.accountNumber,
					username: formVariables.username,
					password: formVariables.password,
					name: formVariables.name,
					balance: formVariables.balance,
					email: formVariables.email,
					phone: formVariables.phone,
					status: formVariables.status,
					role: formVariables.role,
				})
				.then((result) => {
					if (result.status === 200) setFormError(null, result.data.message);
				})
				.catch((err) => {
					const { response } = err;
					console.log(err.response);
					if (response.status === 400) {
						setFormError(true, response.data.message);
					} else setFormError(true, "Something's wrong!");
				});
		}
		setValidated(true);
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3">
						<Card.Header className="text-center toolbar">
							<span>TẠO KHÁCH HÀNG MỚI</span>
						</Card.Header>
						<Card.Body>
							{renderAlert()}
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Row>
										<Col>
											<Form.Text className="text-muted font-weight-bold">
												Account Number
											</Form.Text>
											<Form.Control
												required
												type="text"
												name="accountNumber"
												value={formVariables.accountNumber}
												onChange={(e) => handleChange(e)}
											/>
										</Col>
										<Col>
											<Form.Text className="text-muted font-weight-bold">
												Username
											</Form.Text>
											<Form.Control
												required
												type="text"
												name="username"
												value={formVariables.username}
												onChange={(e) => handleChange(e)}
											/>
										</Col>
									</Row>
									<Form.Text className="text-muted">
										You cannot change this value. You will use this username to
										login.
									</Form.Text>
								</Form.Group>
								<Form.Group>
									<Form.Label className="font-weight-bold">
										Basic information
									</Form.Label>
									<Form.Text className="text-muted font-weight-bold">
										Name
									</Form.Text>
									<Form.Control
										required
										type="text"
										name="name"
										value={formVariables.name}
										onChange={(e) => handleChange(e)}
									/>
									<Form.Control.Feedback type="invalid">
										Please fill the field.
									</Form.Control.Feedback>
									<Form.Text className="text-muted font-weight-bold">
										Email
									</Form.Text>
									<Form.Control
										required
										type="email"
										name="email"
										value={formVariables.email}
										onChange={(e) => handleChange(e)}
									/>
									<Form.Control.Feedback type="invalid">
										Please fill the field.
									</Form.Control.Feedback>
									<Form.Text className="text-muted font-weight-bold">
										Phone number
									</Form.Text>
									<Form.Control
										required
										type="text"
										name="phone"
										value={formVariables.phone}
										onChange={(e) => handleChange(e)}
									/>
									<Form.Control.Feedback type="invalid">
										Please fill the field.
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label className="font-weight-bold">
										Secret fields
									</Form.Label>
									<Form.Text className="text-muted font-weight-bold">
										Password
									</Form.Text>
									<Form.Control
										required
										type="password"
										name="password"
										value={formVariables.password}
										onChange={(e) => handleChange(e)}
									/>
									<Form.Control.Feedback type="invalid">
										Please fill the field.
									</Form.Control.Feedback>
								</Form.Group>
								<Button variant="primary" type="submit">
									Edit
									{/* {isLoading ? <Spinner animation="border" size="sm" /> : null} */}
								</Button>
							</Form>
						</Card.Body>
						<Card.Footer className="text-muted text-center">
							HCMUS - PTUDWNC - 2019
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default NewCustomerForm;
