import React, { useState } from "react";

import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const BasicInfoForm = ({
	basicInfoForm,
	setBasicInfoForm,
	accessToken,
	updateUserInfo,
	setShowBasicForm,
}) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			const entity = {
				accountNumber: basicInfoForm.accountNumber,
				username: basicInfoForm.username,
				name: basicInfoForm.name,
				phone: basicInfoForm.phone,
				email: basicInfoForm.email,
			};
			updateUserInfo(entity, accessToken);
		}
		setValidated(true);
	};

	const handleBasicInfoChange = (e) => {
		basicInfoForm[e.target.name] = e.target.value;
		setBasicInfoForm({ ...basicInfoForm });
	};

	return (
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
							value={basicInfoForm.accountNumber}
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
							value={basicInfoForm.username}
							disabled
						/>
					</Col>
				</Row>
				<Form.Text className="text-muted">
					You cannot change this value. You will use this username to login.
				</Form.Text>
			</Form.Group>
			<Form.Group>
				<Form.Label className="font-weight-bold">Basic information</Form.Label>
				<Form.Text className="text-muted font-weight-bold">Name</Form.Text>
				<Form.Control
					required
					type="text"
					name="name"
					value={basicInfoForm.name.toUpperCase()}
					onChange={(e) => handleBasicInfoChange(e)}
					disabled
				/>
				<Form.Control.Feedback type="invalid">
					Please fill the field.
				</Form.Control.Feedback>
				<Form.Text className="text-muted font-weight-bold">Email</Form.Text>
				<Form.Control
					required
					type="email"
					name="email"
					value={basicInfoForm.email}
					onChange={(e) => handleBasicInfoChange(e)}
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
					value={basicInfoForm.phone}
					onChange={(e) => handleBasicInfoChange(e)}
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
	);
};

export default BasicInfoForm;
