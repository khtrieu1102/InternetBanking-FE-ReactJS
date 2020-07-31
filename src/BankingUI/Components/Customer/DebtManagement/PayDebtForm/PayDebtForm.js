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

// Hiện render form khi bấm vào nút thanh toán
const PayDebtForm = ({
	formVariables,
	setFormVariables,
	handleChange,
	setStep,
	setFormError,
}) => {
	const [validated, setValidated] = useState(false);

	const handleGetOtp = async (event) => {
		const form = event.currentTarget;

		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			await axios
				.post(`/api/pay/${formVariables.debtId}`, {
					content: formVariables.feedbackContent,
				})
				.then((result) => {
					if (result.status === 200) return result.data;
				})
				.then((result) => {
					console.log(result.data.transactionId);
					formVariables["transactionId"] = result.data.transactionId;
					if (result.data) {
						console.log(result.data.transactionId);
						setFormVariables({ ...formVariables });
					}
					setFormError(
						null,
						"Hệ thống đã gửi OTP code cho bạn, hãy kiểm tra mail!"
					);
				})
				.catch((error) => {
					console.log(error.response);
				});
			console.log(formVariables);
			setStep("get-otp-debt");
		}
	};

	return (
		<>
			<h5 className="text-center">THANH TOÁN NHẮC NỢ</h5>
			{formVariables.message && (
				<AlertBox
					alertTypes={formVariables.error}
					alertMessage={formVariables.message}
				/>
			)}
			<p className="information">
				<dl className="row">
					<dt className="col-sm-4">Số tiền:</dt>
					<dd className="col-sm-7">
						{moneyFormatter.format(formVariables.amount)}
					</dd>
					<dt className="col-sm-4">Người tạo nợ:</dt>
					<dd className="col-sm-7">{formVariables.sentUserName}</dd>
					<dt className="col-sm-4">Người nợ</dt>
					<dd className="col-sm-7">{formVariables.receivedUserName}</dd>
					<dt className="col-sm-4">Nội dung:</dt>
					<dd className="col-sm-7">"{formVariables.debtContent}"</dd>
					<dt className="col-sm-4">Ngày nhắc:</dt>
					<dd className="col-sm-7">
						{new Date(formVariables.createdAt).toDateString()}
					</dd>
				</dl>
			</p>
			<Form noValidate validated={validated} onSubmit={handleGetOtp}>
				<Form.Group>
					<Form.Text className="text-muted font-weight-bold">
						Nội dung thanh toán
					</Form.Text>
					<Form.Control
						required
						as="textarea"
						rows="3"
						type="text"
						name="feedbackContent"
						value={formVariables.feedbackContent}
						onChange={(e) => handleChange(e)}
						isInvalid={formVariables.feedbackContent === ""}
					/>
					<Form.Control.Feedback type="invalid">
						Give your receiver a message to know
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					variant="primary-outline"
					type="button"
					onClick={() => setStep("debt-list")}
				>
					<FontAwesomeIcon icon={faBackward} /> Back
				</Button>
				<Button variant="primary" type="submit" className="float-right">
					{false ? (
						<>
							<Spinner animation="border" size="sm" /> Waiting...
						</>
					) : (
						<>Nhận OTP Code</>
					)}
				</Button>
			</Form>
		</>
	);
};

export default PayDebtForm;
