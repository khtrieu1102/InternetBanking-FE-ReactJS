import React, { useEffect, useState, useRef } from "react";
import { Container, Col, Card, Row, Nav, Badge, Alert } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";
import "./DebtManagement.css";

import moneyFormatter from "../../HelperFunctions/moneyFormatter";
import DebtFilter from "./DebtFilter/DebtFilter";

const DebtManagement = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		reducerUserTransactions,
	} = props;
	const currentUser = reducerUserInformation.data;
	const [renderOption, setRenderOption] = useState("pending-mine");
	const [debtsData, setDebtsData] = useState([]);
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
			.get(`http://localhost:5000/api/debt/history`, {
				headers: {
					Authorization: `Bearer ${reducerAuthorization.authentication.accessToken}`,
				},
			})
			.then((result) => result.data.data)
			.then((result) => {
				if (isGettingAList) {
					result.reverse();
					console.log(result);
					setDebtsData(result);
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
						<Card.Header className="toolBar">QUẢN LÝ NỢ</Card.Header>
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
							<Nav
								fill
								justify
								variant="tabs"
								defaultActiveKey="pending-mine"
								onSelect={(selectedKey) => {
									setRenderOption(selectedKey);
								}}
							>
								<Nav.Item>
									<Nav.Link eventKey="pending-mine">Nhắc nợ của bạn</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="pending-theirs">Nhắc nợ gửi đến</Nav.Link>
								</Nav.Item>
							</Nav>
							<DebtFilter
								accessToken={reducerAuthorization.authentication.accessToken}
								currentUser={currentUser}
								debtsData={debtsData}
								filterType={renderOption}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DebtManagement;
