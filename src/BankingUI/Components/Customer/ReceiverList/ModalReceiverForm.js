import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

const ModalForm = ({
	show,
	handleClose,
	workingReceiver,
	accessToken,
	setWorkingReceiver,
	isAdding,
}) => {
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		if (!isAdding)
			getThisUserName(workingReceiver.accountNumber, workingReceiver.bankId);
	}, [workingReceiver.accountNumber, workingReceiver.bankId]);

	const getThisUserName = async (accountNumber, bankId) => {
		if (bankId !== -1 && accountNumber !== "") {
			console.log(accountNumber, bankId);
			const name = await axios
				.get(`http://localhost:5000/api/users/${accountNumber}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then((result) => {
					if (result.data.name) return result.data.name;
					return "KHONG TIM THAY";
				})
				.catch((err) => "KHONG TIM THAY");
			await setWorkingReceiver({ ...workingReceiver, name: name });
		}
	};

	const handleChange = (e) => {
		workingReceiver[e.target.name] = e.target.value;
		setWorkingReceiver({ ...workingReceiver });
	};

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			if (isAdding) {
				await axios.patch(
					`http://localhost:5000/api/users/receiver-list`,
					{
						savedName: workingReceiver.savedName,
						bankId: +workingReceiver.bankId,
						accountNumber: workingReceiver.accountNumber,
					},
					{ headers: { Authorization: `Bearer ${accessToken}` } }
				);
			} else {
				await axios.patch(
					`http://localhost:5000/api/users/receiver-list-update`,
					{
						savedName: workingReceiver.savedName,
						bankId: +workingReceiver.bankId,
						accountNumber: workingReceiver.accountNumber,
					},
					{ headers: { Authorization: `Bearer ${accessToken}` } }
				);
			}
		}
		setValidated(true);
	};

	const renderComponent = () => {
		if (!isAdding) {
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
									name="accountNumber"
									value={workingReceiver.accountNumber}
									onChange={(e) => handleChange(e)}
									disabled
								/>
							</Col>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									Bank
								</Form.Text>
								<Form.Control
									size="sm"
									as="select"
									name="bankId"
									value={workingReceiver.bankId}
									onChange={(e) => handleChange(e)}
									disabled
								>
									<option value={-1}></option>
									<option value={0}>SAPHASAN Bank</option>
									<option value={1}>Ngân hàng Ba Tê</option>
									<option value={2}>BAOSON Bank</option>
								</Form.Control>
							</Col>
						</Row>
						<Form.Text className="text-muted">
							You cannot change this value. You will use this username to login.
						</Form.Text>
						<Form.Text className="text-muted font-weight-bold">
							Full name
						</Form.Text>
						<Form.Control
							required
							type="text"
							name="name"
							value={workingReceiver.name}
							onChange={(e) => handleChange(e)}
							disabled
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text className="text-muted font-weight-bold">
							Saved name
						</Form.Text>
						<Form.Control
							required
							type="text"
							name="savedName"
							value={workingReceiver.savedName}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Text className="text-muted">
							We will use user's name in case saved name is missing.
						</Form.Text>
						<Form.Control.Feedback type="invalid">
							Please fill the field.
						</Form.Control.Feedback>
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
			);
		} else {
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
									name="accountNumber"
									value={workingReceiver.accountNumber}
									onChange={(e) => handleChange(e)}
									onBlur={() =>
										getThisUserName(
											workingReceiver.accountNumber,
											workingReceiver.bankId
										)
									}
								/>
							</Col>
							<Col>
								<Form.Text className="text-muted font-weight-bold">
									Bank
								</Form.Text>
								<Form.Control
									size="sm"
									as="select"
									name="bankId"
									value={workingReceiver.bankId}
									onChange={(e) => handleChange(e)}
									onBlur={() =>
										getThisUserName(
											workingReceiver.accountNumber,
											workingReceiver.bankId
										)
									}
								>
									<option value={-1}></option>
									<option value={0}>SAPHASAN Bank</option>
									<option value={1}>Ngân hàng Ba Tê</option>
									<option value={2}>BAOSON Bank</option>
								</Form.Control>
							</Col>
						</Row>
						<Form.Text className="text-muted">
							You cannot change this value. You will use this username to login.
						</Form.Text>
						<Form.Text className="text-muted font-weight-bold">
							Full name
						</Form.Text>
						<Form.Control
							required
							type="text"
							name="name"
							value={workingReceiver.name}
							onChange={(e) => handleChange(e)}
							disabled
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text className="text-muted font-weight-bold">
							Saved name
						</Form.Text>
						<Form.Control
							required
							type="text"
							name="savedName"
							value={workingReceiver.savedName}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Text className="text-muted">
							We will use user's name in case saved name is missing.
						</Form.Text>
						<Form.Control.Feedback type="invalid">
							Please fill the field.
						</Form.Control.Feedback>
					</Form.Group>
					<Button variant="primary" type="submit">
						Add
					</Button>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			);
		}
	};

	return (
		<Modal show={show} onHide={handleClose} animation={false} centered>
			<Modal.Header closeButton>
				<Modal.Title>Receiver Form</Modal.Title>
			</Modal.Header>
			<Modal.Body>{renderComponent()}</Modal.Body>
		</Modal>
	);
};

export default ModalForm;
