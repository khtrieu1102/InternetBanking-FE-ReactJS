import React from "react";
import { Badge, Alert, ListGroup } from "react-bootstrap";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";

const NotificationList = (props) => {
	const { notificationsData } = props;

	const showComponent = () => {
		if (notificationsData.length === 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Chưa có thông báo nào trong thời gian này!"
				/>
			);
		} else {
			return (
				<>
					<ListGroup>
						{notificationsData.map((item, index) => {
							const dateToShow = new Date(item.createdAt).toGMTString();
							return (
								<ListGroup.Item key={index}>
									<span>
										<b>{item.notificationTitle}</b>
									</span>
									<p className={`content-${index}`}>
										{item.notificationContent}
									</p>
									<hr />
									<span>{dateToShow}</span>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</>
			);
		}
	};

	return <>{showComponent()}</>;
};

export default NotificationList;
