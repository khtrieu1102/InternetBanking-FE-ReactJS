import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ToolBar from "./ToolBar/ToolBar";
import ModalReceiverForm from "./ModalReceiverForm";
import AlertBox from "../../Others/AlertBox/AlertBox";

import "./ReceiverList.css";

const ReceiverList = (props) => {
	const { reducerAuthorization, reducerUserInformation } = props;
	const [modalFormVariables, setModalFormVariables] = useState({
		show: false,
		isAdding: false,
	});
	const mountedRef = useRef(true);
	const receiversData = reducerUserInformation.receivers;
	const [workingReceiver, setWorkingReceiver] = useState({
		accountNumber: "",
		savedName: "",
		bankId: -1,
		name: "",
	});

	useEffect(() => {
		if (!mountedRef.current) return null;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!workingReceiver.accountNumber || workingReceiver.bankId === -1) return;
		handleShowFormModal(false);
	}, [workingReceiver]);

	const handleClose = () => {
		setModalFormVariables({
			...modalFormVariables,
			show: false,
			isAdding: false,
		});
		setWorkingReceiver({
			accountNumber: "",
			savedName: "",
			bankId: -1,
			name: "",
		});
	};

	// set show modal and state isAdding
	const handleShowFormModal = (isAdding) => {
		setModalFormVariables({
			...modalFormVariables,
			show: true,
			isAdding: isAdding,
		});
	};

	// Delete
	const deleteReceiver = async (accountNumber, bankId) => {
		await axios.delete(`http://localhost:5000/api/users/receiver-list`, {
			headers: {
				Authorization: `Bearer ${reducerAuthorization.authentication.accessToken}`,
			},
			data: { accountNumber: accountNumber, bankId: +bankId },
		});
		window.location.reload();
	};

	const showComponent = () => {
		if (receiversData.length === 0) {
			return (
				<AlertBox
					alertTypes="success"
					alertHeading="Xin chào!"
					alertMessage="Hiện tại bạn chưa có người nhận nào, hãy thêm để dễ thao tác hơn!"
				/>
			);
		} else {
			return (
				<Table responsive="sm" striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Bank name</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{receiversData.map((receiver, index) => {
							return (
								<tr key={index}>
									<td>{receiver.accountNumber}</td>
									<td>
										<span
											type="button"
											className="name"
											onClick={() => {
												setWorkingReceiver(receiver);
											}}
										>
											{receiver.savedName}
										</span>
									</td>
									<td>
										{receiver.bankId === 0
											? "SAPHASAN Bank"
											: receiver.bankId === 1
											? "Ngân hàng Ba Tê"
											: "BAOSON Bank"}
									</td>
									<td className="action">
										<Button
											variant="danger"
											size="sm"
											onClick={() =>
												deleteReceiver(receiver.accountNumber, receiver.bankId)
											}
										>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			);
		}
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<ToolBar
							handleShowFormModal={handleShowFormModal}
							setModalFormVariables={setModalFormVariables}
							setWorkingReceiver={setWorkingReceiver}
							modalFormVariables={modalFormVariables}
						/>
						<ModalReceiverForm
							show={modalFormVariables.show}
							isAdding={modalFormVariables.isAdding}
							handleClose={handleClose}
							workingReceiver={workingReceiver}
							setWorkingReceiver={setWorkingReceiver}
							accessToken={reducerAuthorization.authentication.accessToken}
						/>
						<Card.Body>{showComponent()}</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default ReceiverList;
