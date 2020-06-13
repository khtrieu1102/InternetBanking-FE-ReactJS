import React from "react";
import { Alert } from "react-bootstrap";
import propTypes from "prop-types";

const AlertBox = ({ alertTypes, alertHeading, alertMessage }) => {
	if (!alertHeading) {
		alertHeading = alertTypes === "danger" ? "ERROR FOUND!" : "CONGRATULATION!";
	}

	return (
		<Alert variant={alertTypes}>
			<Alert.Heading>{alertHeading}</Alert.Heading>
			<p>{alertMessage}</p>
		</Alert>
	);
};

export default AlertBox;
