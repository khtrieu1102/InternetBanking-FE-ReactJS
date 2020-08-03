import React from "react";
import { Redirect, Route } from "react-router-dom";

import LoginConnect from "../BankingUI/Components/Authentication/Login/LoginConnect";
import ForgotPasswordConnect from "../BankingUI/Components/Authentication/ForgotPassword/ForgotPasswordConnect";
import NotFound from "../BankingUI/Components/Others/NotFound/NotFound";

import DefaultLayout from "../BankingUI/Components/Layout/DefaultLayout";

//* CUSTOMER'S COMPONENTS *//
import DashboardConnect from "../BankingUI/Components/Customer/Dashboard/DashboardConnect";
import ReceiverListConnect from "../BankingUI/Components/Customer/ReceiverList/ReceiverListConnect";
import FormEditInfoConnect from "../BankingUI/Components/Customer/FormEditInfo/FormEditInfoConnect";
import TransactionConnect from "../BankingUI/Components/Customer/Transaction/TransactionConnect";
import TransactionManagementConnect from "../BankingUI/Components/Customer/TransactionManagement/TransactionManagementConnect";
import DebtAddFormConnect from "../BankingUI/Components/Customer/DebtAddForm/DebtAddFormConnect";
import DebtManagementConnect from "../BankingUI/Components/Customer/DebtManagement/DebtManagementConnect";
import NotificationConnect from "../BankingUI/Components/Customer/Notification/NotificationConnect";

//* EMPLOYEE'S COMPONENTS *//
import EmployeeDashboardConnect from "../BankingUI/Components/Employee/Dashboard/DashboardConnect";
import NewCustomerFormConnect from "../BankingUI/Components/Employee/NewCustomerForm/NewCustomerFormConnect";
import DepositFormConnect from "../BankingUI/Components/Employee/DepositForm/DepositFormConnect";
import CustomerTransactionConnect from "../BankingUI/Components/Employee/CustomerTransaction/CustomerTransactionConnect";

//* ADMINISTRATOR'S COMPONENTS *//
import AdminDashboardConnect from "../BankingUI/Components/Admin/Dashboard/DashboardConnect";
import EmployeeManagementConnect from "../BankingUI/Components/Admin/EmployeeManagement/EmployeeManagementConnect";
import NewEmployeeFormConnect from "../BankingUI/Components/Admin/NewEmployeeForm/NewEmployeeFormConnect";
import TransactionStatisticsConnect from "../BankingUI/Components/Admin/TransactionStatistics/TransactionStatisticsConnect";

export const PrivateRoute = ({ comp: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				rest.isAuthenticated ? (
					<Component {...props} />
				) : (
					// children
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export const public_routes = [
	{
		path: "/login",
		routetype: Route,
		component: LoginConnect,
	},
	{
		path: "/reset-password",
		routetype: Route,
		component: ForgotPasswordConnect,
	},
];

export const customer_routes = [
	{
		path: "/",
		routetype: PrivateRoute,
		component: DashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/edit",
		routetype: PrivateRoute,
		component: FormEditInfoConnect,
		layout: DefaultLayout,
	},
	{
		path: "/receivers",
		routetype: PrivateRoute,
		component: ReceiverListConnect,
		layout: DefaultLayout,
	},
	{
		path: "/transaction",
		routetype: PrivateRoute,
		component: TransactionConnect,
		layout: DefaultLayout,
	},
	{
		path: "/transaction-management",
		routetype: PrivateRoute,
		component: TransactionManagementConnect,
		layout: DefaultLayout,
	},
	{
		path: "/debt",
		routetype: PrivateRoute,
		component: DebtAddFormConnect,
		layout: DefaultLayout,
	},
	{
		path: "/debt-management",
		routetype: PrivateRoute,
		component: DebtManagementConnect,
		layout: DefaultLayout,
	},
	{
		path: "/notification",
		routetype: PrivateRoute,
		component: NotificationConnect,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: PrivateRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];

export const admin_routes = [
	{
		path: "/",
		routetype: PrivateRoute,
		component: AdminDashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/edit",
		routetype: PrivateRoute,
		component: FormEditInfoConnect,
		layout: DefaultLayout,
	},
	{
		path: "/employees",
		routetype: PrivateRoute,
		component: EmployeeManagementConnect,
		layout: DefaultLayout,
	},
	{
		path: "/new-employee",
		routetype: PrivateRoute,
		component: NewEmployeeFormConnect,
		layout: DefaultLayout,
	},
	{
		path: "/statistics",
		routetype: PrivateRoute,
		component: TransactionStatisticsConnect,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: PrivateRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];

export const employee_routes = [
	{
		path: "/",
		routetype: PrivateRoute,
		component: EmployeeDashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/new-customer",
		routetype: PrivateRoute,
		component: NewCustomerFormConnect,
		layout: DefaultLayout,
	},
	{
		path: "/edit",
		routetype: PrivateRoute,
		component: FormEditInfoConnect,
		layout: DefaultLayout,
	},
	{
		path: "/deposit",
		routetype: PrivateRoute,
		component: DepositFormConnect,
		layout: DefaultLayout,
	},
	{
		path: "/customer-transaction",
		routetype: PrivateRoute,
		component: CustomerTransactionConnect,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: PrivateRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];
