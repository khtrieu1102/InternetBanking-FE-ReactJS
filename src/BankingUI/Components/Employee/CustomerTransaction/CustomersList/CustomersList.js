import React from "react";
import { Table, Button } from "react-bootstrap";

import formatter from "../../../HelperFunctions/moneyFormatter";

const CustomersList = (props) => {
	const {
		usersData,
		setStep,
		setCurrentUser,
		currentUser,
		getUserTransaction,
	} = props;

	const handleClick = (item) => {
		currentUser["name"] = item.name;
		currentUser["accountNumber"] = item.accountNumber;
		currentUser["balance"] = item.balance;
		setCurrentUser({ ...currentUser });
		setStep(1);
		// getUserTransaction();
	};

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Full Name</th>
					<th>Balance</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{usersData.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.accountNumber}</td>
							<td>{item.username}</td>
							<td>{item.name}</td>
							<td>{formatter.format(item.balance)}</td>
							<td>
								<Button onClick={() => handleClick(item)}>Go</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default CustomersList;
