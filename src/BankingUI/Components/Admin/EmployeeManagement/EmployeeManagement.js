import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";
import EmployeesList from "./EmployeesList/EmployeesList";
import EmployeeDetail from "./EmployeeDetail/EmployeeDetail";

const EmployeeManagement = (props) => {
	const { reducerAuthorization, reducerUserInformation } = props;
	const { accessToken } = reducerAuthorization.authentication;
	const [validated, setValidated] = useState(false);
	const [employeesData, setEmployeesData] = useState([]);
	const [step, setStep] = useState(0);
	const mountedRef = useRef(true);

	const [currentEmployee, setCurrentEmployee] = useState({
		accountNumber: "",
		username: "",
		name: "",
		email: "",
		phone: "",
		createdAt: null,
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
		if (currentEmployee.accountNumber === "") return;
		console.log(currentEmployee);
		// getUserTransaction();
	}, [currentEmployee.accountNumber]);

	const getList = async (isGettingAList) => {
		await axios
			.get(`http://localhost:5000/api/admin/all-employees`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((result) => result.data)
			.then((result) => {
				if (isGettingAList) {
					result.reverse();
					console.log(result);
					setEmployeesData(result);
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
						<Card.Header className="toolBar">DANH SÁCH NHÂN VIÊN</Card.Header>
						<Card.Body>
							{step === 0 && (
								<EmployeesList
									employeesData={employeesData}
									setStep={setStep}
									currentUser={currentEmployee}
									setCurrentUser={setCurrentEmployee}
								/>
							)}
							{step === 1 && (
								<EmployeeDetail currentEmployee={currentEmployee} />
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default EmployeeManagement;
