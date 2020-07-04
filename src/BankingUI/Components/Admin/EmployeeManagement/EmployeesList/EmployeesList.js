import React from "react";
import { Table, Button } from "react-bootstrap";

import formatter from "../../../HelperFunctions/moneyFormatter";

const CustomersList = (props) => {
	const { employeesData, setStep, setCurrentUser, currentUser } = props;

	const handleClick = (item) => {
		currentUser["name"] = item.name;
		currentUser["username"] = item.username;
		currentUser["accountNumber"] = item.accountNumber;
		currentUser["email"] = item.email;
		currentUser["phone"] = item.phone;
		currentUser["createdAt"] = item.createdAt;

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
					<th>Email</th>
					<th>Number</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{employeesData.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.accountNumber}</td>
							<td>{item.username}</td>
							<td>{item.name}</td>
							<td>{item.email}</td>
							<td>{item.phone}</td>
							<td>
								<Button onClick={() => handleClick(item)}>Detail</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default CustomersList;
