import React, { useEffect, useState, useRef } from "react";
import { Container, Col, Card, Row, Badge, Alert } from "react-bootstrap";

import AlertBox from "../../Others/AlertBox/AlertBox";
import "./TransactionManagement.css";

const TransactionManagement = (props) => {
	const { reducerAuthorization, reducerUserInformation } = props;
	const transactionsData = [
		{
			isDebt: false,
			isReceiverPaid: false,
			isVerified: true,
			sentUserId: "0011",
			// sentName:
			sentBankId: 0,
			receivedUserId: "1",
			receivedBankId: 0,
			amount: 500000,
			content:
				"Nạp tiền cho khách hàng ngày Sat Jun 27 2020 15:12:25 GMT+0700 (Indochina Time)",
		},
		{
			isDebt: false,
			isReceiverPaid: false,
			isVerified: true,
			sentUserId: "0011",
			sentBankId: 0,
			receivedUserId: "1",
			receivedBankId: 0,
			amount: 500000,
			content:
				"Nạp tiền cho khách hàng ngày Sat Jun 27 2020 15:12:25 GMT+0700 (Indochina Time)",
		},
		{
			isDebt: false,
			isReceiverPaid: false,
			isVerified: true,
			sentUserId: "1",
			sentBankId: 0,
			receivedUserId: "7",
			receivedBankId: 0,
			amount: 50000,
			content: "Gửi m 20k nha",
		},
		{
			isDebt: false,
			isReceiverPaid: false,
			isVerified: true,
			sentUserId: "1",
			sentBankId: 0,
			receivedUserId: "7",
			receivedBankId: 0,
			amount: 120000,
			content:
				"Nạp tiền cho khách hàng ngày Sat Jun 27 2020 15:12:25 GMT+0700 (Indochina Time)",
		},
	];
	const [formVariables, setFormVariables] = useState({
		accountNumber: "",
		bankId: 0,
		name: "",
		savedName: "",
		amount: 50000,
		content: "",
		otp: "",
		isDebt: 0,
		isReceiverPaid: false,
		transactionId: "",
		createdAt: "",
		error: null,
		message: "",
	});
	const mountedRef = useRef(true);

	useEffect(() => {
		if (!mountedRef.current) return null;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const showComponent = () => {
		if (transactionsData.length !== 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Hiện tại bạn chưa có người nhận nào, hãy thêm để dễ thao tác hơn!"
				/>
			);
		} else {
			return (
				<>
					<div class="form-group row">
						<label for="example-date-input" class="col-4 col-form-label">
							Date
						</label>
						<div class="col-8">
							<input
								class="form-control"
								type="date"
								value={Date()}
								onChange={(e) => console.log(e.target.value)}
								id="example-date-input"
							/>
						</div>
					</div>

					<Alert variant="success">
						<Badge variant="primary">Giao dịch</Badge>{" "}
						<span>
							<span>
								<b>NGUYEN NGOC KHAC TRIEU</b>
							</span>
							<Badge variant="success" className="float-right money">
								+ đ750.000
							</Badge>
						</span>
						<hr />
						<span>20/01/2020</span>
					</Alert>
					<Alert variant="danger">
						<Badge variant="primary">Giao dịch</Badge>{" "}
						<span>
							<span>
								<b>NGUYEN NGOC KHAC TRIEU</b>
							</span>
							<Badge variant="danger" className="float-right money">
								- đ1.750.000
							</Badge>
						</span>
						<hr />
						<span>20/01/2020</span>
					</Alert>
					<Alert variant="success">
						<Badge variant="secondary">Thanh toán nợ</Badge>{" "}
						<span>
							<span>
								<b>NGUYEN NGOC KHAC TRIEU</b>
							</span>
							<Badge variant="success" className="float-right money">
								+ đ750.000
							</Badge>
						</span>
						<p>Thanh toán nợ hôm 20 nha mày, cảm ơn nhiều hehee!</p>
						<hr />
						<span>20/01/2020</span>
					</Alert>
					<Alert variant="dark">
						<Badge variant="secondary">Thanh toán nợ</Badge>{" "}
						<span>
							<span>
								<b>NGUYEN NGOC KHAC TRIEU</b>
							</span>
							<Badge variant="danger" className="float-right money">
								- đ350.000
							</Badge>
						</span>
						<hr />
						<span>20/01/2020</span>
					</Alert>
				</>
			);
		}
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">
							QUẢN LÝ GIAO DỊCH TÀI KHOẢN
						</Card.Header>
						<Card.Body>{showComponent()}</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionManagement;
