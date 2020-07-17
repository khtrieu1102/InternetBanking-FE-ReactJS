import React, { useState } from "react";
import { Badge, Alert, Button } from "react-bootstrap";

import AlertBox from "../../../Others/AlertBox/AlertBox";
import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBackward } from "@fortawesome/free-solid-svg-icons";

import TransactionDetail from "../TransactionDetail/TransactionDetail";

const TransactionList = (props) => {
	const { transactionsData, currentUser } = props;
	const [step, setStep] = useState("total");
	const [workingTransaction, setWorkingTransaction] = useState({
		sentUserId: "",
	});

	const DetailTransaction = () => {
		return (
			<>
				<TransactionDetail transactionDetail={workingTransaction} />
				<Button
					variant="light"
					size="sm"
					onClick={() => {
						setStep("total");
					}}
				>
					<FontAwesomeIcon icon={faBackward} /> BACK
				</Button>
			</>
		);
	};

	const TotalTransaction = () => {
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
						const dateToShow = new Date(item.createdAt).toUTCString();
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
								<Button
									variant="success"
									size="sm float-right"
									onClick={() => {
										setWorkingTransaction(
											Object.assign(workingTransaction, item)
										);
										setStep("detail");
									}}
								>
									<FontAwesomeIcon icon={faEye} />
								</Button>
							</Alert>
						);
					})}
				</>
			);
		}
	};

	return (
		<>
			{step === "total" && <TotalTransaction />}
			{step === "detail" && <DetailTransaction />}
		</>
	);
};

export default TransactionList;
