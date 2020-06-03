import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const ModalForm = ({ show, handleClose }) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			console.log("this form");
		}
		setValidated(true);
	};

	return (
		<Modal show={show} onHide={handleClose} animation={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group>
						{/* <Form.Label className="font-weight-bold">ID and UserName</Form.Label> */}
						<Row>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									Account Number
								</Form.Text>
								<Form.Control required type="text" disabled />
							</Col>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									Username
								</Form.Text>
								<Form.Control required type="text" disabled />
							</Col>
						</Row>
						<Form.Text className="text-muted">
							You cannot change this value. You will use this username to login.
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label className="font-weight-bold">Full Name</Form.Label>
						<Row>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									First Name
								</Form.Text>
								<Form.Control required type="text" />
								<Form.Control.Feedback type="invalid">
									Please fill the field.
								</Form.Control.Feedback>
							</Col>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									Last Name
								</Form.Text>
								<Form.Control required type="text" />
								<Form.Control.Feedback type="invalid">
									Please fill the field.
								</Form.Control.Feedback>
							</Col>
						</Row>
					</Form.Group>
					<Button variant="primary" type="submit">
						Edit
					</Button>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ModalForm;
