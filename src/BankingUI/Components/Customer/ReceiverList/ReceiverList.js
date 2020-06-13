import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ToolBar from "./ToolBar/ToolBar";
import ModalForm from "./ModalForm";
import AlertBox from "../../Others/AlertBox/AlertBox";
import axios from "axios";

const ReceiverList = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		getAllReceivers,
		getReceiverList,
	} = props;
	const [modalFormVariables, setModalFormVariables] = useState({ show: false });
	const mountedRef = useRef(true);
	const receiversData = reducerUserInformation.receivers;

	useEffect(() => {
		if (!mountedRef.current) return null;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const handleClose = () => {
		setModalFormVariables({ ...modalFormVariables, show: false });
	};

	const handleShowFormModal = () => {
		setModalFormVariables({ ...modalFormVariables, show: true });
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
						{receiversData.map((receiver, index) => (
							<tr key={index}>
								<td>{receiver.accountNumber}</td>
								<td>{receiver.savedName}</td>
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
										onClick={handleShowFormModal}
									>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</td>
							</tr>
						))}
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
							isAdding={true}
						/>
						<ModalForm
							show={modalFormVariables.show}
							handleClose={handleClose}
						/>
						<Card.Body>{showComponent()}</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default ReceiverList;
