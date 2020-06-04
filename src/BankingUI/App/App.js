import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";

import { public_routes, private_routes } from "../../routes/appRoutes";
import axios from "axios";

const App = (props) => {
	const {
		reducerAuthorization,
		setUserAccessToken,
		setIsAuthenticated,
	} = props;
	const {
		isAuthenticated,
		authentication,
		userInfomation,
	} = reducerAuthorization;
	const localAccessToken = localStorage.getItem("token");

	useEffect(() => {
		console.log("hello world");
		if (localAccessToken) {
			if (!authentication.accessToken) setUserAccessToken(localAccessToken);
		} else setUserAccessToken(null);
		// get Token from both side (redux + localStorage)
	}, []);

	useEffect(() => {
		if (authentication.accessToken) {
			if (userInfomation.id === -1) {
				axios
					.get("http://localhost:5000/api/users/me", {
						headers: { Authorization: `Bearer ${authentication.accessToken}` },
					})
					.then((result) => {
						if (result.status === 200) {
							console.log(result);
							setIsAuthenticated(true);
						}
					})
					.catch((err) => {
						console.log(err);
						setIsAuthenticated(false);
						localStorage.removeItem("token");
					});
			}
		} else {
			setIsAuthenticated(false);
			localStorage.removeItem("token");
		}
		// get Token from both side (redux + localStorage)
	}, [authentication.accessToken]);

	return (
		<div className="app">
			<Router>
				<Switch>
					{/* https://stackoverflow.com/questions/43520498/react-router-private-routes-redirect-not-working => Newm */}
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
					{private_routes.map((item, index) => {
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
					{/* <Route path="/login" component={() => <LogIn />} />
					<Route path="/register" component={() => <Register />} />

					<PrivateRoute path="/" comp={() => <Dashboard />} /> */}
				</Switch>
			</Router>
		</div>
	);
};

export default App;
