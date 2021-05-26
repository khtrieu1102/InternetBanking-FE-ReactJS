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
const OtpDebtForm = ({
	formVariables,
	setFormVariables,
	handleChange,
	setStep,
	setFormError,
}) => {
	const [validated, setValidated] = useState(false);

	const handleSubmitOtp = async (event) => {
		const form = event.currentTarget;

		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			console.log(formVariables);
			await axios
				.post(
					"/api/transaction/verify-code",
					{
						code: formVariables.otpCode,
					},
					{
						headers: {
							transactionId: formVariables.transactionId,
							debtId: formVariables.debtId,
						},
					}
				)
				.then((result) => {
					setFormVariables({ ...formVariables, isLoading: false });
					if (result.status === 200) {
						setFormError(
							null,
							`Thanh toán nợ thành công! Tuyệt vời! 
							Bạn sẽ quay lại danh sách nợ trong 5 giây nữa...`
						);
						setTimeout(() => {
							setStep("debt-list");
							setFormError(null, "");
						}, 5000);
					}
				})
				.catch((err) => {
					console.log(err.response);
					err.response
						? setFormError(true, err.response.data.message)
						: setFormError(true, "Something's wrong, please try again!");
				});
		}
	};

	return (
		<>
			<h5 className="text-center">XÁC NHẬN OTP</h5>
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
			<Form noValidate validated={validated} onSubmit={handleSubmitOtp}>
				<Form.Group>
					<Form.Text className="text-muted font-weight-bold">
						Your OTP code
					</Form.Text>
					<Form.Control
						required
						type="text"
						name="otpCode"
						value={formVariables.otpCode}
						onChange={(e) => handleChange(e)}
						isInvalid={formVariables.otpCode === ""}
					/>
					<Form.Control.Feedback type="invalid">
						Give your receiver a message to know
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					variant="primary-outline"
					type="button"
					onClick={() => setStep("pay-debt")}
				>
					<FontAwesomeIcon icon={faBackward} /> Back
				</Button>
				<Button variant="success" type="submit" className="float-right">
					{false ? (
						<>
							<Spinner animation="border" size="sm" /> Waiting...
						</>
					) : (
						<>Thanh toán</>
					)}
				</Button>
			</Form>
		</>
	);
};

export default OtpDebtForm;
