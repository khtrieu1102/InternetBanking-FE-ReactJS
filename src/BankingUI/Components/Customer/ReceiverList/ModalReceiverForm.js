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

	// Lấy tên người dùng khi bấm vào receiver có sẵn.
	useEffect(() => {
		if (!isAdding)
			getThisUserName(workingReceiver.accountNumber, workingReceiver.bankId);
	}, [workingReceiver.accountNumber, workingReceiver.bankId]);

	// Hàm lấy tên người dùng theo accountNumber, gọi qua API
	const getThisUserName = async (accountNumber, bankId) => {
		console.log(accountNumber, bankId);

		if (bankId !== -1 && accountNumber !== "") {
			const result = await axios
				.get(`/api/users/bank/${bankId}/users/${accountNumber}`)
				.then((result) => {
					console.log(result.data);
					if (result.data.name) {
						return { name: result.data.name, username: result.data.username };
					}
					return { name: "KHONG TIM THAY", username: "KHONG TIM THAY" };
				})
				.catch((err) => {
					console.log(err.response);
					return { name: "KHONG TIM THAY", username: "KHONG TIM THAY" };
				});
			console.log(accountNumber, bankId);
			await setWorkingReceiver({
				...workingReceiver,
				name: result.name,
				username: result.username,
			});
			console.log(workingReceiver);
		}
	};

	// Update giá trị điền vào Form
	const handleChange = (e) => {
		workingReceiver[e.target.name] = e.target.value;
		setWorkingReceiver({ ...workingReceiver });
	};

	// Submit
	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (
			form.checkValidity() === false ||
			workingReceiver.name === "KHONG TIM THAY"
		) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			if (isAdding) {
				// Nếu như là add vào một receiver mới
				await axios.patch(`/api/users/receiver-list`, {
					savedName:
						workingReceiver.savedName !== ""
							? workingReceiver.savedName
							: workingReceiver.username,
					bankId: +workingReceiver.bankId,
					accountNumber: workingReceiver.accountNumber,
				});
			} else {
				// Nếu như update (chỉ đổi savedName)
				await axios.patch(`/api/users/receiver-list-update`, {
					savedName:
						workingReceiver.savedName !== ""
							? workingReceiver.savedName
							: workingReceiver.username,
					bankId: +workingReceiver.bankId,
					accountNumber: workingReceiver.accountNumber,
				});
			}
		}
		setValidated(true);
	};

	// Render component
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
							isInvalid={workingReceiver.name === "KHONG TIM THAY"}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text className="text-muted font-weight-bold">
							Saved name
						</Form.Text>
						<Form.Control
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
		<Modal show={show} onHide={handleClose} animation={true} centered>
			<Modal.Header closeButton>
				<Modal.Title>Receiver Form</Modal.Title>
			</Modal.Header>
			<Modal.Body>{renderComponent()}</Modal.Body>
		</Modal>
	);
};

export default ModalForm;
