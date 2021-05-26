import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Container, Form } from "react-bootstrap";
import { Table, Badge, Button, Space, DatePicker } from "antd";
import axios from "axios";
import getBankName from "../../HelperFunctions/getBankName";
import formatter from "../../HelperFunctions/moneyFormatter";
import TransactionDetail from "../../Customer/TransactionManagement/TransactionDetail/TransactionDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBackward } from "@fortawesome/free-solid-svg-icons";

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const TransactionStatistics = (props) => {
	const [transactionsData, setTransactionsData] = useState([]);
	const [filteredTransactionsData, setFilteredTransactionsData] = useState([]);
	const [step, setStep] = useState("table");
	const [workingTransaction, setWorkingTransaction] = useState({
		sentUserId: "",
	});
	// const [fromDate, setFromDate] = useState(null);
	let range = null;
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
				setFilteredTransactionsData(result);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const onFilter = (range) => {
		if (range === null) return alert("Sai");
		const fromDateUTC = new Date(range.fromDate);
		const toDateUTC = new Date(range.toDate);
		const newTransactionData = transactionsData.filter((item) => {
			const createdAtDate = new Date(item.createdAt);
			if (fromDateUTC <= createdAtDate && toDateUTC >= createdAtDate)
				return true;
			return false;
		});
		console.log(newTransactionData);
		setFilteredTransactionsData(newTransactionData);
	};

	const StatisticTable = () => {
		return (
			<>
				<Space>
					<RangePicker
						onChange={(dates, dateStrings) => {
							console.log("hello: ", dates, dateStrings);
							range = { fromDate: dateStrings[0], toDate: dateStrings[1] };
						}}
					/>
					<Button type="primary" onClick={() => onFilter(range)}>
						Filter
					</Button>
				</Space>
				<Table dataSource={filteredTransactionsData}>
					<Column
						title="Sent bank"
						dataIndex="sentBankId"
						key="sentBankId"
						render={(sentBankId) => <>{getBankName(sentBankId)}</>}
						filters={[
							{ text: "SAPHASANBank", value: 0 },
							{ text: "3TBank", value: 1 },
							{ text: "BAOSON Bank", value: 2 },
						]}
						onFilter={(value, record) => record.sentBankId === value}
					/>
					<Column
						title="Received bank"
						dataIndex="receivedBankId"
						key="receivedBankId"
						render={(receivedBankId) => <>{getBankName(receivedBankId)}</>}
						filters={[
							{ text: "SAPHASANBank", value: 0 },
							{ text: "3TBank", value: 1 },
							{ text: "BAOSON Bank", value: 2 },
						]}
						onFilter={(value, record) => record.receivedBankId === value}
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
						title="Date"
						key="createdAt"
						render={(row) => {
							return <>{new Date(row.createdAt).toUTCString()}</>;
						}}
						sorter={(a, b) => new Date(a.createdAt) - new Date(b.createdAt)}
					/>
					<Column
						title="Action"
						key="action"
						render={(item) => (
							<Button
								type="primary"
								onClick={() => {
									setWorkingTransaction(
										Object.assign(workingTransaction, item)
									);
									setStep("transaction-detail");
								}}
							>
								Detail
							</Button>
						)}
					/>
				</Table>
			</>
		);
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<Card.Header className="toolBar">TRA SOÁT GIAO DỊCH</Card.Header>
						<Card.Body>
							{step === "table" && <StatisticTable />}
							{step === "transaction-detail" && (
								<>
									<Button
										variant="light"
										size="sm"
										onClick={() => {
											setStep("table");
										}}
									>
										<FontAwesomeIcon icon={faBackward} /> BACK
									</Button>
									<TransactionDetail transactionDetail={workingTransaction} />
								</>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default TransactionStatistics;
