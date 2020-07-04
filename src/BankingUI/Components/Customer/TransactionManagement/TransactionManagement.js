import React, { useEffect, useState, useRef } from "react";
import { Container, Col, Card, Row, Badge, Alert } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";
import "./TransactionManagement.css";
import TransactionList from "./TransactionList/TransactionList";

import moneyFormatter from "../../HelperFunctions/moneyFormatter";

const TransactionManagement = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		reducerUserTransactions,
	} = props;
	const currentUser = reducerUserInformation.data;
	// const transactionsData = reducerUserTransactions.data;
	// const transactionsData = [];
	const [transactionsData, setTransactionsData] = useState([]);
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

		let isGettingAList = true;
		getList(isGettingAList);

		return () => {
			mountedRef.current = false;
			isGettingAList = false;
		};
	}, []);

	const getList = async (isGettingAList) => {
		await axios
			.get(`http://localhost:5000/api/transaction/history`, {
				headers: {
					Authorization: `Bearer ${reducerAuthorization.authentication.accessToken}`,
				},
			})
			.then((result) => result.data.data)
			.then((result) => {
				if (isGettingAList) {
					result.reverse();
					setTransactionsData(result);
					isGettingAList = false;
				}
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const showComponent = () => {
		if (transactionsData.length === 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Chưa có giao dịch nào trong thời gian này!"
				/>
			);
		} else {
			return (
				<>
					{transactionsData.map((item, index) => {
						let nameToShow = "";
						let moneyType, moneyDetail, transactionType, badgeName;
						if (item.receivedUserId === currentUser.accountNumber) {
							nameToShow = item.sentUserName;
							moneyType = "success";
							moneyDetail = `+ ${moneyFormatter.format(item.amount)}`;
							transactionType = "success";
							badgeName = item.isDebt ? "Thanh toán nợ" : "Nhận từ";
						} else {
							nameToShow = item.receivedUserName;
							moneyType = "danger";
							moneyDetail = `- ${moneyFormatter.format(item.amount)}`;
							transactionType = item.isDebt ? "secondary" : "danger";
							badgeName = item.isDebt ? "Thanh toán nợ" : "Chuyển cho";
						}
						const badgeType = item.isDebt ? "secondary" : "primary";
						const dateToShow = new Date(item.createdAt).toDateString();
						return (
							<Alert variant={transactionType} key={index}>
								<Badge variant={badgeType}>{badgeName}</Badge>{" "}
								<span>
									<span>
										<b>{nameToShow.toUpperCase()}</b>
									</span>
									<Badge variant={moneyType} className="float-right money">
										{moneyDetail}
									</Badge>
								</span>
								<p>{item.content}</p>
								<hr />
								<span>{dateToShow}</span>
							</Alert>
						);
					})}
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
						<Card.Body>
							<div className="form-group row">
								<label
									for="example-date-input"
									className="col-4 col-form-label"
								>
									Date
								</label>
								<div className="col-8">
									<input
										className="form-control"
										type="date"
										value={Date()}
										onChange={(e) => console.log(e.target.value)}
										id="example-date-input"
									/>
								</div>
							</div>
							<TransactionList
								transactionsData={transactionsData}
								currentUser={currentUser}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionManagement;
