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
const DeleteDebtForm = ({
	formVariables,
	setFormVariables,
	handleChange,
	setStep,
	setFormError,
}) => {
	const [validated, setValidated] = useState(false);

	const handleDelete = async (event) => {
		console.log(formVariables.debtId);
		event.preventDefault();
		await axios
			.delete("/api/debt/record", {
				data: {
					debtId: formVariables.debtId,
					feedbackContent: formVariables.feedbackContent,
				},
			})
			.then((result) => result.data)
			.then((result) => {
				console.log(result);
				setFormError(null, result.message);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			<h5 className="text-center">XOÁ NHẮC NỢ </h5>
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
			<Form noValidate validated={validated} onSubmit={handleDelete}>
				<Form.Group>
					<Form.Text className="text-muted font-weight-bold">Ghi chú</Form.Text>
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
				<Button variant="danger" type="submit" className="float-right">
					{false ? (
						<>
							<Spinner animation="border" size="sm" /> Waiting...
						</>
					) : (
						<>Xoá nhắc nợ</>
					)}
				</Button>
			</Form>
		</>
	);
};

export default DeleteDebtForm;
