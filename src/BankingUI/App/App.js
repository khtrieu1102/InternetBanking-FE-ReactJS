import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";

import { public_routes, private_routes } from "../../routes/appRoutes";

const App = () => {
	const isAuthenticated = true;
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
