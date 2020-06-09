import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faPencilAlt,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import ToolBar from "./ToolBar/ToolBar";
import ModalForm from "./ModalForm";

const ReceiverList = (props) => {
	const [modalFormVariables, setModalFormVariables] = useState({ show: false });

	const receiver_data = [
		{
			accountNumber: "1234567",
			bankName: "SAPHASAN Bank",
			name: "Trieu an com",
		},
		{
			accountNumber: "3198197",
			bankName: "SAPHASAN Bank",
			name: "Thuong C310",
		},
		{
			accountNumber: "3340129",
			bankName: "SAPHASAN Bank",
			name: "Thoi dep trai",
		},
		{
			accountNumber: "2019384",
			bankName: "SAPHASAN Bank",
			name: "Bao Son",
		},
		{
			accountNumber: "1023959",
			bankName: "BAOSON Bank",
			name: "quan123",
		},
	];

	const handleClose = () => {
		setModalFormVariables({ ...modalFormVariables, show: false });
	};
	const handleShowFormModal = () => {
		setModalFormVariables({ ...modalFormVariables, show: true });
	};

	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 5, offset: 3 }} lg={6}>
					<Card className="mt-3">
						<ToolBar handleShowFormModal={handleShowFormModal} />
						<ModalForm
							show={modalFormVariables.show}
							handleClose={handleClose}
						/>
						<Card.Body>
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
									{receiver_data.map((receiver, index) => (
										<tr>
											<td>{receiver.accountNumber}</td>
											<td>{receiver.name}</td>
											<td>{receiver.bankName}</td>
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
									{/* <tr>
										<td>2</td>
										<td>1131</td>
										<td>Trieu</td>
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
									<tr>
										<td>3</td>
										<td>2302</td>
										<td>Thornton</td>
										<td className="action">
											<Button
												variant="danger"
												size="sm"
												onClick={handleShowFormModal}
											>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</td>
									</tr> */}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default ReceiverList;
