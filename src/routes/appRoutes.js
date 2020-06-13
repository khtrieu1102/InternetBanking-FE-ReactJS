import React from "react";
import { Redirect, Route } from "react-router-dom";

import LoginConnect from "../BankingUI/Components/Authentication/Login/LoginConnect";
import ForgotPasswordConnect from "../BankingUI/Components/Authentication/ForgotPassword/ForgotPasswordConnect";
import NotFound from "../BankingUI/Components/Others/NotFound/NotFound";
import Register from "../BankingUI/Components/Authentication/Register/Register";

import DefaultLayout from "../BankingUI/Components/Layout/DefaultLayout";

import DashboardConnect from "../BankingUI/Components/Customer/Dashboard/DashboardConnect";
import ReceiverList from "../BankingUI/Components/Customer/ReceiverList/ReceiverList";
import FormEditInfoConnect from "../BankingUI/Components/Customer/FormEditInfo/FormEditInfoConnect";
import TransactionConnect from "../BankingUI/Components/Customer/Transaction/TransactionConnect";

export const CustomerRoute = ({ comp: Component, ...rest }) => {
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

export const AdminRoute = ({ comp: Component, ...rest }) => {
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
		routetype: CustomerRoute,
		component: DashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/edit",
		routetype: CustomerRoute,
		component: FormEditInfoConnect,
		layout: DefaultLayout,
	},
	{
		path: "/receivers",
		routetype: CustomerRoute,
		component: ReceiverList,
		layout: DefaultLayout,
	},
	{
		path: "/transaction",
		routetype: CustomerRoute,
		component: TransactionConnect,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: CustomerRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];

export const admin_routes = [
	{
		path: "/",
		routetype: AdminRoute,
		component: DashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: AdminRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];
