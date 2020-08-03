import React, { useEffect, useState, useRef } from "react";
import { Button, Badge, Alert, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faBackward,
	faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

import PayDebtForm from "../PayDebtForm/PayDebtForm";
import OtpDebtForm from "../OtpDebtForm/OtpDebtForm";
import DeleteDebtForm from "../DeleteDebtForm/DeleteDebtForm";

const DebtsFilter = (props) => {
	const {
		accessToken,
		currentUser,
		debtsData,
		filterType,
		step,
		setStep,
	} = props;
	const [validated, setValidated] = useState(false);
	const [formVariables, setFormVariables] = useState({
		debtId: "",
		sentUserName: "",
		receivedUserName: "",
		debtContent: "",
		amount: 1000,
		createdAt: "",
		feedbackContent: "",
		isReceiverPaid: false,
		otpCode: "",
		transactionId: "",
		error: false,
		message: "",
	});

	const filterData = () => {
		let emptyList = [];
		switch (filterType) {
			case "pending-mine": {
				emptyList = debtsData.filter((item) => {
					return (
						item.status === "pending" &&
						item.sentUserId === currentUser.accountNumber
					);
				});
				break;
			}
			case "pending-theirs": {
				emptyList = debtsData.filter((item) => {
					return (
						item.status === "pending" &&
						item.receivedUserId === currentUser.accountNumber
					);
				});
				break;
			}
			case "paid": {
				emptyList = debtsData.filter((item) => {
					return item.status === "paid";
				});
				break;
			}
		}
		return emptyList;
	};

	const filteredData = filterData();

	// Update giá trị điền vào Form
	const handleChange = (e) => {
		formVariables[e.target.name] = e.target.value;
		setFormVariables({ ...formVariables });
	};

	const setFormError = (error, message) => {
		let alertTypes = error === null ? "success" : "danger";

		formVariables["error"] = alertTypes;
		setFormVariables({ ...formVariables });

		formVariables["message"] = message;
		setFormVariables({ ...formVariables });
	};

	const moveNextStep = (item, type) => {
		console.log(item);
		if (item.debtId !== "") {
			formVariables["debtId"] = item.debtId;
			formVariables["sentUserName"] = item.sentUserName.toUpperCase();
			formVariables["receivedUserName"] = item.receivedUserName.toUpperCase();
			formVariables["debtContent"] = item.debtContent;
			formVariables["createdAt"] = item.createdAt;
			formVariables["amount"] = item.amount;
			formVariables["transactionId"] = item.transactionId;
		}
		setFormVariables({ ...formVariables });
		console.log(formVariables);
		if (type === "delete") setStep(1);
		else setStep("pay-debt");
	};

	// Hiện tất cả các list debts ban đầu
	const renderDebts = () => {
		if (filteredData.length === 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Chưa có nhắc nợ nào trong thời gian này!"
				/>
			);
		} else {
			return (
				<div>
					{filteredData.map((item, index) => {
						let nameToShow = "";
						let moneyType, moneyDetail, transactionType, badgeName;
						let isSentByThisUser = true;
						let isPaid = item.status === "paid";
						if (item.receivedUserId === currentUser.accountNumber) {
							isSentByThisUser = false;
							nameToShow = item.sentUserName;
							moneyType = "danger";
							moneyDetail = moneyFormatter.format(item.amount);
							transactionType = "danger";
							badgeName = "Đang nợ";
						} else {
							nameToShow = item.receivedUserName;
							moneyType = "success";
							moneyDetail = moneyFormatter.format(item.amount);
							transactionType = "success";
							badgeName = "Nhắc nợ cho";
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
								<p>{item.debtContent}</p>
								<hr />
								<span>{dateToShow}</span>
								<span className="float-right">
									{!isSentByThisUser && !isPaid && (
										<Button
											variant="success"
											className="mr-3"
											size="sm"
											onClick={() => moveNextStep(item, "pay")}
										>
											<FontAwesomeIcon icon={faMoneyBill} />
										</Button>
									)}
									{!isPaid && (
										<Button
											variant="danger"
											size="sm"
											onClick={() => moveNextStep(item, "delete")}
										>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
									)}
								</span>
							</Alert>
						);
					})}
				</div>
			);
		}
	};

	return (
		<div className="mt-3">
			{step === "debt-list" && renderDebts()}
			{step === 1 && (
				<DeleteDebtForm
					formVariables={formVariables}
					setFormVariables={setFormVariables}
					setStep={setStep}
					handleChange={handleChange}
					setFormError={setFormError}
				/>
			)}
			{step === "pay-debt" && (
				<PayDebtForm
					formVariables={formVariables}
					setFormVariables={setFormVariables}
					setStep={setStep}
					handleChange={handleChange}
					setFormError={setFormError}
				/>
			)}
			{step === "get-otp-debt" && (
				<OtpDebtForm
					formVariables={formVariables}
					setFormVariables={setFormVariables}
					setStep={setStep}
					handleChange={handleChange}
					setFormError={setFormError}
				/>
			)}
		</div>
	);
};

export default DebtsFilter;
