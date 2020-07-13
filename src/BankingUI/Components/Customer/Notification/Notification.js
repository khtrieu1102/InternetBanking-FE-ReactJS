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
	const {
		reducerAuthorization,
		reducerUserInformation,
		reducerUserTransactions,
	} = props;
	const currentUser = reducerUserInformation.data;
	const [notificationsData, setNotificationsData] = useState([]);
	const mountedRef = useRef(true);
	let isQueryingNotification = true;
	let isGettingAList = true;

	useEffect(() => {
		if (!mountedRef.current || isQueryingNotification === false) return null;

		console.log("COMPONENT DID MOUNT");
		getNotificationHistory();

		return () => {
			mountedRef.current = false;
			isGettingAList = false;
			isQueryingNotification = false;
			console.log("isLoading: ", isQueryingNotification);
		};
	}, []);

	// useEffect(() => {
	// 	if (isQueryingNotification === false) return;

	// 	getNotificationHistory();
	// }, [isQueryingNotification]);
	let ts = 0;
	let flag = 0;

	const getNotificationHistory = async () => {
		// const ts = moment().unix();
		if (isQueryingNotification === false) return;
		// const fn = () => {
		await axios
			.get(`/api/notification/history?ts=${ts}`)
			.then((result) => {
				console.log("isloading at fn: ", isQueryingNotification);
				if (result.status === 200) {
					if (result.data.return_ts !== ts) {
						ts = result.data.return_ts;
						console.log("ts: ", ts);
						return result.data.data;
					}
				} else {
					if (isQueryingNotification) getNotificationHistory();
				}
			})
			.then((result) => {
				// if (!isLoading) return;
				result.forEach((element) => {
					setNotificationsData((notificationsData) => [
						element,
						...notificationsData,
					]);
					if (flag !== 0) {
						openNotification(
							element.notificationTitle,
							element.notificationContent
						);
					}
				});
				// isGettingAList = false;
				flag++;
				console.log("flag: ", flag);
				if (isQueryingNotification) {
					getNotificationHistory();
				}
			})
			.catch((error) => {});
		// };
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">CÁC THÔNG BÁO</Card.Header>
						<Card.Body>
							<NotificationList notificationsData={notificationsData} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Notification;
