import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

import "./JumbotronComponent.css";

const JumbotronComponent = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		setIsAuthenticated,
	} = props;
	const { authentication } = reducerAuthorization;
	const { name, accountNumber } = reducerUserInformation.data;

	const renderJumbotron = () => {
		return (
			<Jumbotron fluid className="jumbotronComponent">
				<Container className="text-center">
					<h1 className="userName">{name.toUpperCase()}</h1>
					<p>Account Number: {accountNumber} - SAPHASAN Bank - 2020</p>
				</Container>
			</Jumbotron>
		);
	};

	return <>{authentication.role === "customer" && renderJumbotron()}</>;
};

export default JumbotronComponent;
