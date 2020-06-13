import React from "react";
import { Redirect, Route } from "react-router-dom";

import LoginConnect from "../BankingUI/Components/Authentication/Login/LoginConnect";
import NotFound from "../BankingUI/Components/Others/NotFound/NotFound";
import Register from "../BankingUI/Components/Authentication/Register/Register";

import DefaultLayout from "../BankingUI/Components/Layout/DefaultLayout";

import DashboardConnect from "../BankingUI/Components/Customer/Dashboard/DashboardConnect";
import ReceiverList from "../BankingUI/Components/Customer/ReceiverList/ReceiverList";

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
];

export const private_routes = [
	{
		path: "/",
		routetype: PrivateRoute,
		component: DashboardConnect,
		layout: DefaultLayout,
	},
	{
		path: "/edit",
		routetype: PrivateRoute,
		component: Register,
		layout: DefaultLayout,
	},
	{
		path: "/receivers",
		routetype: PrivateRoute,
		component: ReceiverList,
		layout: DefaultLayout,
	},
	{
		path: "/*",
		routetype: PrivateRoute,
		component: NotFound,
		layout: DefaultLayout,
	},
];
