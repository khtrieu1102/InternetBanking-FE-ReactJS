import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddAmountForm = (props) => {
	const {
		formVariables,
		setFormVariables,
		accessToken,
		setStep,
		balance,
		setFormError,
	} = props;
	const [validated, setValidated] = useState(false);

	// Update giá trị điền vào Form
	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
	};

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (
			form.checkValidity() === false ||
			formVariables.name == "" ||
			formVariables.name == "KHONG TIM THAY"
		) {
			event.stopPropagation();
		} else {
			console.log(formVariables);
			axios
				.post("/api/debt", {
					receivedUserId: formVariables.accountNumber,
					receivedBankId: formVariables.bankId,
					amount: formVariables.amount,
					debtContent: formVariables.content,
				})
				.then((result) => {
					setFormError(null, "Nhắc nợ thành công");
					console.log(result.message);
				})
				.catch((err) => {
					setFormError(true, err.response);
					console.log(err.response);
				});
			// setStep(3);
			// setFormError(null, "");
			// } else
			// 	setFormError(true, "Tiền không đủ, chuyển cái gì mà chuyển hả trời!");
		}
		setValidated(true);
	};

	return (
		<>
			<h5>Step 2: Add money amount and description</h5>
			<hr />
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
								value={formVariables.bankId}
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
					<Form.Text className="text-muted font-weight-bold">
						Full name
					</Form.Text>
					<Form.Control
						required
						type="text"
						name="name"
						value={formVariables.name}
						onChange={(e) => handleChange(e)}
						isInvalid={
							formVariables.name === "" ||
							formVariables.name === "KHONG TIM THAY"
						}
						disabled
					/>
				</Form.Group>
				<Form.Group>
					<Form.Text className="text-muted font-weight-bold">Amount</Form.Text>
					<Form.Control
						required
						type="number"
						step="1000"
						min="1000"
						name="amount"
						value={formVariables.amount}
						onChange={(e) => handleChange(e)}
						isInvalid={formVariables.amount % 1000 !== 0}
					/>
					<Form.Control.Feedback type="invalid">
						Số tiền phải chia hết cho 1.000đ
					</Form.Control.Feedback>
					<Form.Text className="text-muted font-weight-bold">Message</Form.Text>
					<Form.Control
						required
						as="textarea"
						rows="3"
						name="content"
						value={formVariables.content}
						onChange={(e) => handleChange(e)}
						isInvalid={formVariables.content === ""}
					/>
					<Form.Control.Feedback type="invalid">
						Give your receiver a message to know
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit">
					Next
				</Button>
				<Button
					variant="primary-outline"
					type="button"
					onClick={() => setStep(1)}
				>
					<FontAwesomeIcon icon={faBackward} /> Back
				</Button>
			</Form>
		</>
	);
};

export default AddAmountForm;
