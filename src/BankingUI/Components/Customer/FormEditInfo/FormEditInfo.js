import React, { useState, useEffect } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import BasicInfoForm from "./BasicInfoForm/BasicInfoForm";
import PasswordForm from "./PasswordForm/PasswordForm";
import "./FormEditInfo.css";

const FormEditInfo = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		updateUserInfo,
	} = props;
	const { accessToken } = reducerAuthorization.authentication;
	const {
		accountNumber,
		username,
		name,
		phone,
		email,
	} = reducerUserInformation.data;
	const [basicInfoForm, setBasicInfoForm] = useState({
		accountNumber: accountNumber,
		username: username,
		name: name,
		phone: phone,
		email: email,
	});
	const [passwordForm, setPasswordForm] = useState({
		accountNumber: accountNumber,
		username: username,
		currentPassword: "",
		newPassword: "",
		retypeNewPassword: "",
	});

	const [showBasicForm, setShowBasicForm] = useState(true);

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3">
						<Card.Header className="text-center toolbar">
							<span>EDIT INFORMATION</span>

							{showBasicForm === true ? (
								<Link
									onClick={() => {
										setShowBasicForm(false);
									}}
								>
									Change Password
								</Link>
							) : (
								<Link
									onClick={() => {
										setShowBasicForm(true);
									}}
								>
									Basic
								</Link>
							)}
						</Card.Header>
						<Card.Body>
							{showBasicForm === true ? (
								<BasicInfoForm
									basicInfoForm={basicInfoForm}
									setBasicInfoForm={setBasicInfoForm}
									updateUserInfo={updateUserInfo}
									accessToken={accessToken}
									setShowBasicForm={setShowBasicForm}
								/>
							) : (
								<PasswordForm
									passwordForm={passwordForm}
									setPasswordForm={setPasswordForm}
									accessToken={accessToken}
									setShowBasicForm={setShowBasicForm}
								/>
							)}
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

export default FormEditInfo;
