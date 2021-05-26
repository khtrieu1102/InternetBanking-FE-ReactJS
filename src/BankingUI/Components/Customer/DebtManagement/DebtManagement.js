import React, { useEffect, useState, useRef } from "react";
import { Container, Col, Card, Row, Nav, Button, Alert } from "react-bootstrap";
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
	const [step, setStep] = useState("debt-list");
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
			.get("/api/debt/history")
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
								<Nav.Item>
									<Nav.Link eventKey="paid">Hoàn tất</Nav.Link>
								</Nav.Item>
							</Nav>
							<DebtFilter
								accessToken={reducerAuthorization.authentication.accessToken}
								currentUser={currentUser}
								debtsData={debtsData}
								filterType={renderOption}
								setStep={setStep}
								step={step}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DebtManagement;
