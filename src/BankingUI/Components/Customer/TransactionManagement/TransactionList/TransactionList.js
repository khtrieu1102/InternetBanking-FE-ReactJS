import React from "react";
import { Badge, Alert } from "react-bootstrap";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";

const TransactionList = (props) => {
	const { transactionsData, currentUser } = props;

	const showComponent = () => {
		if (transactionsData.length === 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Chưa có giao dịch nào trong thời gian này!"
				/>
			);
		} else {
			return (
				<>
					<h5>Khách hàng: {currentUser.name.toUpperCase()}</h5>
					{transactionsData.map((item, index) => {
						let nameToShow = "";
						let moneyType, moneyDetail, transactionType, badgeName;
						if (item.receivedUserId === currentUser.accountNumber) {
							nameToShow = item.sentUserName;
							moneyType = "success";
							moneyDetail = `+ ${moneyFormatter.format(item.amount)}`;
							transactionType = "success";
							badgeName = item.isDebt ? "Thanh toán nợ" : "Nhận từ";
						} else {
							nameToShow = item.receivedUserName;
							moneyType = "danger";
							moneyDetail = `- ${moneyFormatter.format(item.amount)}`;
							transactionType = item.isDebt ? "secondary" : "danger";
							badgeName = item.isDebt ? "Thanh toán nợ" : "Chuyển cho";
						}
						const badgeType = item.isDebt ? "secondary" : "primary";
						const dateToShow = new Date(item.createdAt).toDateString();
						return (
							<Alert variant={transactionType} key={index}>
								<Badge variant={badgeType}>{badgeName}</Badge>{" "}
								<span>
									<span>
										<b>{nameToShow.toUpperCase()}</b>
									</span>
									<Badge variant={moneyType} className="float-right money">
										{moneyDetail}
									</Badge>
								</span>
								<p>{item.content}</p>
								<hr />
								<span>{dateToShow}</span>
							</Alert>
						);
					})}
				</>
			);
		}
	};

	return <>{showComponent()}</>;
};

export default TransactionList;
