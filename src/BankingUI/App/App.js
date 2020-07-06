import React, { useEffect, useRef, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";

import {
	public_routes,
	customer_routes,
	admin_routes,
	employee_routes,
} from "../../routes/appRoutes";
import axios from "axios";
import jwtDecode from "jwt-decode";

// import socketIO from "../../service/socket";

const App = (props) => {
	const {
		reducerAuthorization,
		setUserAccessToken,
		setIsAuthenticated,
		getAllInformation,
		setRole,
		getAllReceivers,
		getAllTransactions,
	} = props;
	const { isAuthenticated, authentication } = reducerAuthorization;
	const { role } = authentication;
	const localAccessToken = localStorage.getItem("token");
	const mountedRef = useRef(true);

	useEffect(() => {
		if (!mountedRef.current) return null;

		if (localAccessToken) {
			if (!authentication.accessToken) setUserAccessToken(localAccessToken);
		} else setUserAccessToken(null);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	axios.defaults.baseURL = "http://localhost:5000";
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${authentication.accessToken}`;

	// TODO: Gọi tới refresh token
	// useEffect(() => {
	// 	let interval;
	// 	console.log(isAuthenticated, authentication.accessToken);
	// 	if (isAuthenticated !== false && authentication.accessToken !== "") {
	// 		interval = setInterval(() => {
	// 			console.log("This will run 5 seconds!");
	// 		}, 5000);
	// 	}
	// 	return () => clearInterval(interval);
	// }, [isAuthenticated, authentication.accessToken]);

	useEffect(() => {
		if (!mountedRef.current) return null;

		if (authentication.accessToken) {
			setRole(jwtDecode(authentication.accessToken).role);
			axios
				.get("/api/users/me")
				.then((result) => {
					if (result.status === 200) {
						setIsAuthenticated(true);
						getAllInformation(result.data);
						getAllReceivers(authentication.accessToken);
						// getAllTransactions(authentication.accessToken);
					}
				})
				.catch((err) => {
					console.log(err);
					setIsAuthenticated(false);
					setUserAccessToken("");
					localStorage.removeItem("token");
				});
		}
		if (!authentication.accessToken && !localAccessToken) {
			setIsAuthenticated(false);
			setUserAccessToken("");
			localStorage.removeItem("token");
		}
	}, [authentication.accessToken]);

	return (
		<div className="app">
			<Router>
				<Switch>
					{/* https://stackoverflow.com/questions/43520498/react-router-private-routes-redirect-not-working => Newm */}
					{/* --- LOGIN/PUBLIC COMPONENTS RENDER --- */}
					{public_routes.map((item, index) => {
						return (
							<Route
								key={index}
								path={item.path}
								exact={item.exact ? item.exact : null}
								component={(props) => (
									<item.component
										{...props}
										{...item.props}
										isAuthenticated={isAuthenticated}
									/>
								)}
							/>
						);
					})}
					{!isAuthenticated &&
						public_routes.map((item, index) => {
							return (
								<Redirect
									key={index}
									to={{
										pathname: "/login",
										// state: { from: props.location },
									}}
								/>
							);
						})}

					{/* ---CUSTOMER RENDER --- */}
					{isAuthenticated &&
						role === "customer" &&
						customer_routes.map((item, index) => {
							return (
								<item.routetype
									key={index}
									path={item.path}
									exact={item.exact ? item.exact : null}
									isAuthenticated={isAuthenticated}
									comp={(props) => {
										return item.layout ? (
											<item.layout>
												<item.component {...props} {...item.props} />
											</item.layout>
										) : (
											<item.component {...props} {...item.props} />
										);
									}}
								/>
							);
						})}

					{/* ---ADMIN RENDER --- */}
					{isAuthenticated &&
						role === "admin" &&
						admin_routes.map((item, index) => {
							return (
								<item.routetype
									key={index}
									path={item.path}
									exact={item.exact ? item.exact : null}
									isAuthenticated={isAuthenticated}
									comp={(props) => {
										return item.layout ? (
											<item.layout>
												<item.component {...props} {...item.props} />
											</item.layout>
										) : (
											<item.component {...props} {...item.props} />
										);
									}}
								/>
							);
						})}

					{/* ---EMPLOYEE RENDER --- */}
					{isAuthenticated &&
						role === "employee" &&
						employee_routes.map((item, index) => {
							return (
								<item.routetype
									key={index}
									path={item.path}
									exact={item.exact ? item.exact : null}
									isAuthenticated={isAuthenticated}
									comp={(props) => {
										return item.layout ? (
											<item.layout>
												<item.component {...props} {...item.props} />
											</item.layout>
										) : (
											<item.component {...props} {...item.props} />
										);
									}}
								/>
							);
						})}
				</Switch>
			</Router>
		</div>
	);
};

export default App;
