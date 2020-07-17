import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container, Form, Table } from "react-bootstrap";

import ReceiverDetail from "./ReceiverDetail/ReceiverDetail";
import AddAmountForm from "./AddAmountForm/AddAmountForm";

import "./Transaction.css";

import AlertBox from "../../Others/AlertBox/AlertBox";

const DebtAddForm = (props) => {
	const { reducerAuthorization, reducerUserInformation } = props;
	const { accessToken } = reducerAuthorization.authentication;
	const { balance } = reducerUserInformation.data;
	const receiversData = reducerUserInformation.receivers;

	const [formVariables, setFormVariables] = useState({
		accountNumber: "",
		bankId: 0,
		name: "",
		savedName: "",
		amount: 1000,
		debtContent: "",
		error: null,
		message: "",
	});
	const [step, setStep] = useState(1);

	const renderAlert = () => {
		if (formVariables.message)
			return (
				<AlertBox
					alertTypes={formVariables.error}
					alertMessage={formVariables.message}
				/>
			);
	};

	const setFormError = (error, message) => {
		let alertTypes = error === null ? "success" : "danger";

		formVariables["error"] = alertTypes;
		setFormVariables({ ...formVariables });

		formVariables["message"] = message;
		setFormVariables({ ...formVariables });
	};

	const renderStepForm = () => {
		switch (step) {
			case 1:
				return (
					<ReceiverDetail
						receiversData={receiversData}
						formVariables={formVariables}
						setFormVariables={setFormVariables}
						accessToken={accessToken}
						setStep={setStep}
						setFormError={setFormError}
					/>
				);
			case 2:
				return (
					<AddAmountForm
						formVariables={formVariables}
						setFormVariables={setFormVariables}
						accessToken={accessToken}
						setStep={setStep}
						balance={balance}
						setFormError={setFormError}
					/>
				);
		}
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3">
						<Card.Header className="text-center">DEBT ADDING</Card.Header>
						<Card.Body>
							{renderAlert()}
							{renderStepForm()}
						</Card.Body>
						<Card.Footer className="text-muted text-center">
							HCMUS - PTUDWNC - 2019
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DebtAddForm;
