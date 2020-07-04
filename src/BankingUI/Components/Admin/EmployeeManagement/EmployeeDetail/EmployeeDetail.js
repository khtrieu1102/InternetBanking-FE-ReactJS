import React from "react";
import { Table, Button } from "react-bootstrap";

const EmployeeDetail = (props) => {
	const { currentEmployee } = props;

	console.log(currentEmployee);

	return (
		<>
			<h5 className="text-center">THÔNG TIN NHÂN VIÊN</h5>
			{/* {formVariables.message && (
				<AlertBox
					alertTypes={formVariables.error}
					alertMessage={formVariables.message}
				/>
			)} */}
			<p className="information">
				<dl className="row">
					<dt className="col-sm-4">Số tài khoản:</dt>
					<dd className="col-sm-7">{currentEmployee.accountNumber}</dd>
					<dt className="col-sm-4">Tên đăng nhập:</dt>
					<dd className="col-sm-7">{currentEmployee.username}</dd>
					<dt className="col-sm-4">Họ tên:</dt>
					<dd className="col-sm-7">{currentEmployee.name}</dd>
					<dt className="col-sm-4">Email:</dt>
					<dd className="col-sm-7">{currentEmployee.email}</dd>
					<dt className="col-sm-4">Số điện thoại:</dt>
					<dd className="col-sm-7">"{currentEmployee.phone}"</dd>
					<dt className="col-sm-4">Ngày tạo:</dt>
					<dd className="col-sm-7">
						{new Date(currentEmployee.createdAt).toDateString()}
					</dd>
				</dl>
			</p>
		</>
	);
};

export default EmployeeDetail;
