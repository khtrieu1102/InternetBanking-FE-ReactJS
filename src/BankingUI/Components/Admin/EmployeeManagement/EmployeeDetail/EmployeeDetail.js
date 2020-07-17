import React from "react";
import { Spinner, Button, Badge } from "react-bootstrap";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faTrash } from "@fortawesome/free-solid-svg-icons";

import AlertBox from "../../../Others/AlertBox/AlertBox";

const EmployeeDetail = (props) => {
	const {
		currentEmployee,
		setStep,
		accessToken,
		setFormError,
		setCurrentEmployee,
	} = props;

	const handleDelete = async () => {
		setCurrentEmployee({ ...currentEmployee, isLoading: true });
		await axios
			.delete(`/api/admin/employees/${currentEmployee.accountNumber}`)
			.then((result) => {
				if (result.status === 200) {
					setFormError(null, result.data.message);
					setCurrentEmployee({ ...currentEmployee, isLoading: false });
					window.location.reload();
				}
			})
			.catch((error) => {
				console.log(error);
				// setFormError(error.response.message);
			});
	};

	const handleRecover = async () => {
		setCurrentEmployee({ ...currentEmployee, isLoading: true });

		await axios
			.patch(`/api/admin/employees/recover/${currentEmployee.accountNumber}`)
			.then((result) => {
				console.log(result);
				if (result.status === 200) {
					setFormError(null, result.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				// setFormError(error.response.message);
			});
		setCurrentEmployee({ ...currentEmployee, isLoading: false });

		window.location.reload();
	};

	return (
		<>
			<h5 className="text-center">THÔNG TIN NHÂN VIÊN</h5>
			{currentEmployee.message && (
				<AlertBox
					alertTypes={currentEmployee.error}
					alertMessage={currentEmployee.message}
				/>
			)}

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
					<dd className="col-sm-7">{currentEmployee.phone}</dd>
					<dt className="col-sm-4">Ngày tạo:</dt>
					<dd className="col-sm-7">
						{new Date(currentEmployee.createdAt).toDateString()}
					</dd>
					<dt className="col-sm-4">Tình trạng:</dt>
					<dd className="col-sm-7">
						{currentEmployee.status === true ? (
							<Badge variant="primary">working</Badge>
						) : (
							<Badge variant="danger">deleted</Badge>
						)}
					</dd>
				</dl>
			</p>

			<Button
				variant="primary-outline"
				type="button"
				className="mt-3"
				onClick={() => setStep(0)}
			>
				<FontAwesomeIcon icon={faBackward} /> Back
			</Button>

			{currentEmployee.status && (
				<Button
					variant="danger"
					type="button"
					className="float-right"
					onClick={() => handleDelete()}
				>
					{currentEmployee.isLoading ? (
						<>
							<Spinner animation="border" size="sm" /> Waiting...
						</>
					) : (
						<>
							<FontAwesomeIcon icon={faTrash} /> Xoá nhân viên
						</>
					)}
				</Button>
			)}
			{!currentEmployee.status && (
				<Button
					variant="primary"
					type="button"
					className="float-right"
					onClick={() => handleRecover()}
				>
					{currentEmployee.isLoading ? (
						<>
							<Spinner animation="border" size="sm" /> Waiting...
						</>
					) : (
						<>
							<FontAwesomeIcon icon={faTrash} /> Phục hồi
						</>
					)}
				</Button>
			)}
		</>
	);
};

export default EmployeeDetail;
