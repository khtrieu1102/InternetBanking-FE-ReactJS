import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

const RecommendAddReceiver = ({
	formVariables,
	accessToken,
	setFormVariables,
	setStep,
}) => {
	const [validated, setValidated] = useState(false);

	// Lấy tên người dùng khi bấm vào receiver có sẵn.
	useEffect(() => {
		getThisUserName(formVariables.accountNumber, formVariables.bankId);
	}, [formVariables.accountNumber, formVariables.bankId]);

	// Hàm lấy tên người dùng theo accountNumber, gọi qua API
	const getThisUserName = async (accountNumber, bankId) => {
		console.log(accountNumber, bankId);
		setFormVariables({ ...setFormVariables, name: "WAITING..." });
		if (bankId !== -1 && accountNumber !== "") {
			const name = await axios
				.get(`/api/users/bank/${bankId}/users/${accountNumber}`)
				.then((result) => {
					if (result.data.name) return result.data.name;
					return "KHONG TIM THAY";
				})
				.catch((err) => "KHONG TIM THAY");
			console.log(accountNumber, bankId);
			await setFormVariables({ ...formVariables, name: name });
		}
	};

	// Update giá trị điền vào Form
	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
	};

	// Submit
	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			await axios.patch(`/api/users/receiver-list`, {
				savedName: formVariables.savedName,
				bankId: +formVariables.bankId,
				accountNumber: formVariables.accountNumber,
			});
		}
		setValidated(true);
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
							name="accountNumber"
							value={formVariables.accountNumber}
							onChange={(e) => handleChange(e)}
							onBlur={() =>
								getThisUserName(
									formVariables.accountNumber,
									formVariables.bankId
								)
							}
						/>
					</Col>
					<Col>
						<Form.Text className="text-muted font-weight-bold">Bank</Form.Text>
						<Form.Control
							size="sm"
							as="select"
							name="bankId"
							value={formVariables.bankId}
							onChange={(e) => handleChange(e)}
							onBlur={() =>
								getThisUserName(
									formVariables.accountNumber,
									formVariables.bankId
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
				<Form.Text className="text-muted font-weight-bold">Full name</Form.Text>
				<Form.Control
					required
					type="text"
					name="name"
					value={formVariables.name}
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
					value={formVariables.savedName}
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
			<Button variant="secondary" onClick={() => setStep(4)}>
				Close
			</Button>
		</Form>
	);
};

export default RecommendAddReceiver;
