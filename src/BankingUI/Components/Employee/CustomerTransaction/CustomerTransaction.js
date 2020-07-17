import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";
import CustomersList from "./CustomersList/CustomersList";
import TransactionList from "../../Customer/TransactionManagement/TransactionList/TransactionList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faBackward,
	faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const CustomerTransaction = (props) => {
	const { reducerAuthorization, reducerUserInformation } = props;
	const { accessToken } = reducerAuthorization.authentication;
	const [validated, setValidated] = useState(false);
	const [usersData, setUsersData] = useState([]);
	const [transactionsData, setTransactionsData] = useState([]);
	const [step, setStep] = useState(0);
	const mountedRef = useRef(true);

	const [currentUser, setCurrentUser] = useState({
		accountNumber: "",
		balance: 0,
		name: "",
		transactions: [],
	});

	useEffect(() => {
		if (!mountedRef.current) return null;

		let isGettingAList = true;
		let isGettingATransactionList = true;
		getList(isGettingAList);

		return () => {
			mountedRef.current = false;
			isGettingAList = false;
			isGettingATransactionList = false;
		};
	}, []);

	useEffect(() => {
		if (currentUser.accountNumber === "") return;
		getUserTransaction();
	}, [currentUser.accountNumber]);

	const getList = async (isGettingAList) => {
		await axios
			.get(`/api/admin/all-users`)
			.then((result) => result.data)
			.then((result) => {
				if (isGettingAList) {
					result.reverse();
					console.log(result);
					setUsersData(result);
					isGettingAList = false;
				}
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const getUserTransaction = async () => {
		await axios
			.post(`/api/admin/user-history-transactions`, {
				accountNumber: currentUser.accountNumber,
			})
			.then((result) => {
				return result.data.data;
			})
			.then((result) => {
				// console.log(
				result.sort((a, b) => {
					if (a.accountNumber < b.accountNumber) return -1;
					if (a.accountNumber > b.accountNumber) return 1;
					return 0;
				});
				// );
				setTransactionsData(result);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">DANH SÁCH NGƯỜI DÙNG</Card.Header>
						<Card.Body>
							{step === 0 && (
								<CustomersList
									usersData={usersData}
									setStep={setStep}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									getUserTransaction={getUserTransaction}
								/>
							)}
							{step === 1 && (
								<>
									<Button
										variant="primary-outline"
										type="button"
										onClick={() => setStep(0)}
									>
										<FontAwesomeIcon icon={faBackward} /> Back
									</Button>
									<TransactionList
										currentUser={currentUser}
										transactionsData={transactionsData}
									/>
								</>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default CustomerTransaction;
