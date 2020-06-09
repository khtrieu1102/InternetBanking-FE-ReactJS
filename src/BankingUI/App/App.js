import React, { useEffect, useRef } from "react";
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
		getAllInformation,
	} = props;
	const {
		isAuthenticated,
		authentication,
		userInformation,
	} = reducerAuthorization;
	const localAccessToken = localStorage.getItem("token");
	const mountedRef = useRef(true);

	useEffect(() => {
		if (!mountedRef.current) return null;

		console.log(`hello world ${localAccessToken}`);
		if (localAccessToken) {
			if (!authentication.accessToken) setUserAccessToken(localAccessToken);
		} else setUserAccessToken(null);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!mountedRef.current) return null;

		if (authentication.accessToken) {
			axios
				.get("http://localhost:5000/api/users/me", {
					headers: { Authorization: `Bearer ${authentication.accessToken}` },
				})
				.then((result) => {
					if (result.status === 200) {
						console.log(result);
						setIsAuthenticated(true);
						getAllInformation(result.data);
					}
				})
				.catch((err) => {
					console.log(err);
					setIsAuthenticated(false);
					localStorage.removeItem("token");
				});
		}
		if (!authentication.accessToken && !localAccessToken) {
			setIsAuthenticated(false);
			localStorage.removeItem("token");
		}
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
				</Switch>
			</Router>
		</div>
	);
};

export default App;
