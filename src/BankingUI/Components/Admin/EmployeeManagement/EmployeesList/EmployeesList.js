import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

import formatter from "../../../HelperFunctions/moneyFormatter";

const CustomersList = (props) => {
	const { employeesData, setStep, setCurrentEmployee, currentEmployee } = props;

	const handleClick = (item) => {
		currentEmployee["name"] = item.name;
		currentEmployee["username"] = item.username;
		currentEmployee["accountNumber"] = item.accountNumber;
		currentEmployee["email"] = item.email;
		currentEmployee["phone"] = item.phone;
		currentEmployee["createdAt"] = item.createdAt;
		currentEmployee["status"] = item.status;

		setCurrentEmployee({ ...currentEmployee });
		setStep(1);
		// getUserTransaction();
	};

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>username</th>
					<th>Tên</th>
					<th>Email</th>
					<th>SĐT</th>
					<th>Tình trạng</th>
					<th></th>
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
								{item.status === true ? (
									<Badge variant="primary">working</Badge>
								) : (
									<Badge variant="danger">deleted</Badge>
								)}
							</td>
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
