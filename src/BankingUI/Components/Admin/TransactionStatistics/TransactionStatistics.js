import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Container, Form } from "react-bootstrap";
import { Table, Badge, Button } from "antd";
import axios from "axios";
import getBankName from "../../HelperFunctions/getBankName";
import formatter from "../../HelperFunctions/moneyFormatter";
const { Column, ColumnGroup } = Table;

const TransactionStatistics = (props) => {
	const [transactionsData, setTransactionsData] = useState([]);
	const [step, setStep] = useState(0);
	const mountedRef = useRef(true);

	useEffect(() => {
		if (!mountedRef.current) return null;

		getList();

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const getList = async () => {
		await axios
			.get(`/api/admin/transactions`)
			.then((result) => result.data.data)
			.then((result) => {
				console.log(result);
				setTransactionsData(result);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">TRA SOÁT GIAO DỊCH</Card.Header>
						<Card.Body>
							<Table dataSource={transactionsData}>
								<Column
									title="Sent bank"
									dataIndex="sentBankId"
									key="sentBankId"
									render={(sentBankId) => <>{getBankName(sentBankId)}</>}
								/>
								<Column
									title="Received bank"
									dataIndex="receivedBankId"
									key="receivedBankId"
									render={(receivedBankId) => (
										<>{getBankName(receivedBankId)}</>
									)}
								/>
								<Column
									title="Amount"
									key="amount"
									render={(row) => {
										let moneyDetail, badgeColor;
										if (row.receivedBankId === 0) {
											moneyDetail = `+ ${formatter.format(row.amount)}`;
											badgeColor = "#52c41a";
										} else {
											moneyDetail = `- ${formatter.format(row.amount)}`;
											badgeColor = "red";
										}
										return (
											<Badge
												className="site-badge-count-109"
												count={moneyDetail}
												style={{ backgroundColor: badgeColor }}
											/>
										);
									}}
								/>
								<Column
									title="Address"
									dataIndex="receivedUserId"
									key="receivedUserId"
								/>
								<Column
									title="Action"
									key="action"
									render={(item) => (
										<Button
											type="primary"
											onClick={() => {
												console.log(item);
											}}
										>
											Detail
										</Button>
									)}
								/>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionStatistics;
