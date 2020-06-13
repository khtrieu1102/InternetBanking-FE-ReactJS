import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const TransactionReceiverList = (props) => {
	const { receiver_data } = props;

	return (
		<>
			<h5>Choose your receiver from list</h5>
			<Table responsive="sm" variant="light" striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Bank name</th>
						<th>Go</th>
					</tr>
				</thead>
				<tbody>
					{receiver_data.map((receiver, index) => (
						<tr className="pointer" onClick={() => console.log(receiver)}>
							<td>{receiver.accountNumber}</td>
							<td>{receiver.name}</td>
							<td>{receiver.bankName}</td>
							<td className="action">
								<Button variant="success" size="sm">
									<FontAwesomeIcon icon={faForward} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default TransactionReceiverList;
