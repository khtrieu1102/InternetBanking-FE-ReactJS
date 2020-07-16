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
// import { Button, notification } from "antd";
import axios from "axios";
import moment from "moment";

import AlertBox from "../../Others/AlertBox/AlertBox";
import moneyFormatter from "../../HelperFunctions/moneyFormatter";
import openNotification from "../../HelperFunctions/openNotification";
import NotificationList from "./NotificationList/NotificationList";

const Notification = (props) => {
	const { reducerUserNotification } = props;
	const mountedRef = useRef(true);
	const notificationsDataaaa = reducerUserNotification.data;

	useEffect(() => {
		if (!mountedRef.current) return null;

		console.log("COMPONENT DID MOUNT");

		return () => {
			mountedRef.current = false;
		};
	}, []);

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">CÁC THÔNG BÁO</Card.Header>
						<Card.Body>
							<NotificationList notificationsData={notificationsDataaaa} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Notification;
