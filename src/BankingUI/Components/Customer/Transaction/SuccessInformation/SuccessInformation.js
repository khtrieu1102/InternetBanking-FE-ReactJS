import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./SuccessInformation.css";

import getBankName from "../../../HelperFunctions/getBankName";

const SuccessInformation = (props) => {
	const {
		formVariables,
		reducerUserInformation,
		balance,
		setStep,
		setFormError,
	} = props;
	const { data, receivers } = reducerUserInformation;

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "VND",
		minimumFractionDigits: 0,
	});

	const thisCustomerIsInReceiverList = (customer) => {
		if (
			customer.accountNumber === formVariables.accountNumber &&
			customer.bankId === formVariables.bankId
		) {
			return true;
		}
		return false;
	};

	return (
		<>
			<h5 className="text-center">
				ĐÃ CHUYỂN {formatter.format(formVariables.amount)}
			</h5>
			<p className="information">
				<dl className="row">
					{/* <dt className="col-sm-3">Thời gian chuyển:</dt>
					<dd className="col-sm-9">{data.name.toUpperCase()}</dd> */}

					<dt className="col-sm-4">Ngày chuyển:</dt>
					<dd className="col-sm-7">{Date(formVariables.createdAt)}</dd>
					{formVariables.isReceiverPaid ? (
						<>
							<dt className="col-sm-4">Người nhận chịu phí:</dt>
							<dd className="col-sm-7">10,000đ</dd>
						</>
					) : (
						<>
							<dt className="col-sm-4">Người chuyển chịu phí:</dt>
							<dd className="col-sm-7">10,000đ</dd>
						</>
					)}
				</dl>
			</p>
			<h5 className="text-center">BÊN CHUYỂN</h5>
			<p className="information">
				<dl className="row">
					<dt className="col-sm-4">Tên người chuyển:</dt>
					<dd className="col-sm-7">{data.name.toUpperCase()}</dd>

					<dt className="col-sm-4">Ngân hàng:</dt>
					<dd className="col-sm-7">SAPHASAN Bank</dd>

					<dt className="col-sm-4">Tài khoản chuyển:</dt>
					<dd className="col-sm-7">{data.accountNumber}</dd>
				</dl>
			</p>
			<h5 className="text-center">BÊN NHẬN</h5>
			<p className="information">
				<dl className="row">
					<dt className="col-sm-4">Tên người nhận:</dt>
					<dd className="col-sm-7">{formVariables.name.toUpperCase()}</dd>

					<dt className="col-sm-4">Ngân hàng:</dt>
					<dd className="col-sm-7">{getBankName(formVariables.bankId)}</dd>

					<dt className="col-sm-4">Tài khoản nhận:</dt>
					<dd className="col-sm-7">{formVariables.accountNumber}</dd>
				</dl>
			</p>
			{receivers.findIndex(thisCustomerIsInReceiverList) === -1 && (
				<Button variant="success" type="submit" onClick={() => setStep(5)}>
					Đưa người này vào danh sách người nhận
				</Button>
			)}
		</>
	);
};

export default SuccessInformation;
