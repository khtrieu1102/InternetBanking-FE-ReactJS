import React from "react";
import { Descriptions } from "antd";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import getBankName from "../../../HelperFunctions/getBankName";

const TransactionDetail = ({ transactionDetail }) => {
	let sentBankName = "";
	let receivedBankName = "";
	// const getBankName = (bankId) => {
	// 	switch (bankId) {
	// 		case 0:
	// 			return "SAPHASAN Bank";
	// 		case 1:
	// 			return "3TBank";
	// 		case 2:
	// 			return "BAOSON Bank";
	// 		default:
	// 			return "SAPHASAN Bank";
	// 	}
	// };
	return (
		<>
			<Descriptions title="Thông tin chuyển khoản">
				<Descriptions.Item label="Số tiền">
					{moneyFormatter.format(transactionDetail.amount)}
				</Descriptions.Item>
				<Descriptions.Item label="Người nhận trả phí">
					{transactionDetail.isReceiverPaid ? "true" : "false"}
				</Descriptions.Item>
				<Descriptions.Item label="Trả nợ">
					{transactionDetail.isDebt ? "true" : "false"}
				</Descriptions.Item>
				<Descriptions.Item label="Thời gian">
					{new Date(transactionDetail.createdAt).toUTCString()}
				</Descriptions.Item>
			</Descriptions>
			<Descriptions title="Người gửi">
				<Descriptions.Item label="Tên gửi">
					{transactionDetail.sentUserName.toUpperCase()}
				</Descriptions.Item>
				<Descriptions.Item label="Tài khoản gửi">
					{transactionDetail.sentUserId}
				</Descriptions.Item>
				<Descriptions.Item label="Ngân hàng gửi">
					{getBankName(transactionDetail.sentBankId)}
				</Descriptions.Item>
			</Descriptions>
			<Descriptions title="Người nhận">
				<Descriptions.Item label="Tên nhận">
					{transactionDetail.receivedUserName.toUpperCase()}
				</Descriptions.Item>
				<Descriptions.Item label="Tài khoản nhận">
					{transactionDetail.receivedUserId}
				</Descriptions.Item>
				<Descriptions.Item label="Ngân hàng nhận">
					{getBankName(transactionDetail.receivedBankId)}
				</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default TransactionDetail;
