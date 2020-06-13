import React, { useState } from "react";
import {
	Col,
	Row,
	Button,
	Card,
	Container,
	Form,
	Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

import TransactionReceiverList from "./TransactionReceiverList/TransactionReceiverList";
import "./Transaction.css";

const FormEditInfo = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		updateUserInfo,
		getAllInformation,
	} = props;
	const { accessToken } = reducerAuthorization.authentication;
	const {
		accountNumber,
		username,
		name,
		phone,
		email,
	} = reducerUserInformation.data;
	const { isLoading } = reducerUserInformation;
	const [validated, setValidated] = useState(false);
	const [messageForm, setMessageForm] = useState({
		accountNumber: accountNumber,
		username: username,
		name: name,
		phone: phone,
		email: email,
	});
	const receiver_data = [
		{
			accountNumber: "1234567",
			bankName: "SAPHASAN Bank",
			name: "Trieu an com",
		},
		{
			accountNumber: "3198197",
			bankName: "SAPHASAN Bank",
			name: "Thuong C310",
		},
		{
			accountNumber: "3340129",
			bankName: "SAPHASAN Bank",
			name: "Thoi dep trai",
		},
		{
			accountNumber: "2019384",
			bankName: "SAPHASAN Bank",
			name: "Bao Son",
		},
		{
			accountNumber: "1023959",
			bankName: "BAOSON Bank",
			name: "quan123",
		},
	];

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			console.log(messageForm);
			updateUserInfo(messageForm, accessToken);
		}
		setValidated(true);
	};

	const handleChange = (e) => {
		messageForm[e.target.name] = e.target.value;
		setMessageForm({ ...messageForm });
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3">
						<Card.Header className="text-center">TRANSACTION</Card.Header>
						<Card.Body>
							<TransactionReceiverList receiver_data={receiver_data} />
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									{/* <Form.Label className="font-weight-bold">ID and UserName</Form.Label> */}
									<Row>
										<Col>
											<Form.Text className="text-muted font-weight-bold">
												Account Number
											</Form.Text>
											<Form.Control
												required
												type="text"
												value={messageForm.accountNumber}
												disabled
											/>
										</Col>
										<Col>
											<Form.Text className="text-muted font-weight-bold">
												Username
											</Form.Text>
											<Form.Control
												required
												type="text"
												value={messageForm.username}
												disabled
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
										Full Name
									</Form.Label>
									<Form.Text className="text-muted font-weight-bold">
										Name
									</Form.Text>
									<Form.Control
										required
										type="text"
										name="name"
										value={messageForm.name}
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
										value={messageForm.email}
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
										value={messageForm.phone}
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

export default FormEditInfo;
