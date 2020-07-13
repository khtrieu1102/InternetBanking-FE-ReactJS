import React, { useEffect, useState, useRef } from "react";
import {
	Container,
	Col,
	Card,
	Row,
	DropdownButton,
	Dropdown,
	ButtonGroup,
} from "react-bootstrap";
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
			.get(`/api/transaction/history`)
			.then((result) => result.data.data)
			.then((result) => {
				if (isGettingAList) {
					result.reverse();
					console.log(result);
					setTransactionsData(result);
					isGettingAList = false;
				}
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
						<Card.Header className="toolBar">
							QUẢN LÝ GIAO DỊCH TÀI KHOẢN
						</Card.Header>
						<Card.Body>
							<div className="form-group row">
								<label
									for="example-date-input"
									className="col-4 col-form-label"
								>
									Sort
								</label>
								<DropdownButton
									as={ButtonGroup}
									id="dropdown-variants-light"
									variant="light"
									title="Date"
								>
									<Dropdown.Item eventKey="1">Action</Dropdown.Item>
									<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
								</DropdownButton>
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
