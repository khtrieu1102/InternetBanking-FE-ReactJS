import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

const ReceiverDetail = (props) => {
	const {
		receiversData,
		formVariables,
		setFormVariables,
		accessToken,
		setStep,
		setFormError,
	} = props;
	const [validated, setValidated] = useState(false);
	const [renderOption, setRenderOption] = useState("component-0");

	// Hàm lấy tên người dùng theo accountNumber, gọi qua API
	const getThisUserName = async (accountNumber, bankId) => {
		console.log(accountNumber, bankId);

		if (bankId !== -1 && accountNumber !== "") {
			const name = await axios
				.get(`/api/users/${accountNumber}`)
				.then((result) => {
					if (result.data.name) return result.data.name;
					return "KHONG TIM THAY";
				})
				.catch((err) => "KHONG TIM THAY");
			console.log(accountNumber, bankId);
			await setFormVariables({
				...formVariables,
				accountNumber: accountNumber,
				bankId: bankId,
				name: name,
			});
		}
	};

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
			if (
				formVariables.name === "" ||
				formVariables.name === "KHONG TIM THAY" ||
				formVariables.accountNumber === "" ||
				formVariables.bankId === -1
			) {
				return;
			}
			setStep(2);
			setFormError(null, "");
		}
		setValidated(true);
	};

	const renderConditionally = () => {
		switch (renderOption) {
			case "component-0":
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
									<Form.Text className="text-muted font-weight-bold">
										Bank
									</Form.Text>
									<Form.Control
										disabled
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
						<Button variant="primary" type="submit">
							Next
						</Button>
					</Form>
				);
			case "component-1":
				if (receiversData.length !== 0) {
					return (
						<Table responsive="sm" striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Bank name</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{receiversData.map((receiver, index) => {
									return (
										<tr key={index}>
											<td>{receiver.accountNumber}</td>
											<td>{receiver.savedName}</td>
											<td>
												{receiver.bankId === 0
													? "SAPHASAN Bank"
													: receiver.bankId === 1
													? "Ngân hàng Ba Tê"
													: "BAOSON Bank"}
											</td>
											<td className="action">
												<Button
													variant="success"
													size="sm"
													onClick={() => {
														console.log(formVariables);
														getThisUserName(
															receiver.accountNumber,
															receiver.bankId
														);
														setStep(2);
													}}
												>
													<FontAwesomeIcon icon={faForward} />
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					);
				} else
					return (
						<>
							<AlertBox
								alertTypes="success"
								alertHeading="Xin chào!"
								alertMessage="Hiện tại bạn chưa có người nhận nào, hãy thêm để dễ thao tác hơn!"
							/>
							<Link to="/receivers">Go to receivers form</Link>
						</>
					);
		}
	};

	return (
		<>
			<h5>Bước 1: Nhập thông tin người cần nhắc nợ (cùng ngân hàng)</h5>
			<Nav
				fill
				variant="tabs"
				defaultActiveKey="component-0"
				onSelect={(selectedKey) => {
					setRenderOption(selectedKey);
				}}
			>
				<Nav.Item>
					<Nav.Link eventKey="component-0">Thông tin mới</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="component-1">Từ danh sách</Nav.Link>
				</Nav.Item>
			</Nav>
			<hr />
			{renderConditionally()}
		</>
	);
};

export default ReceiverDetail;
