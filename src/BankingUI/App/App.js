import React, { useEffect, useRef, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";
import openNotification from "../Components/HelperFunctions/openNotification";

import {
	public_routes,
	customer_routes,
	admin_routes,
	employee_routes,
} from "../../routes/appRoutes";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./App.css";

const axiosInstance = axios.create();

// import socketIO from "../../service/socket";

const App = (props) => {
	const {
		reducerAuthorization,
		reducerUserNotification,
		setUserAccessToken,
		setIsAuthenticated,
		getAllInformation,
		setRole,
		getAllReceivers,
		getAllTransactions,
		setUserRefreshToken,
		setAllNotification,
	} = props;
	const { isAuthenticated, authentication } = reducerAuthorization;
	const { role } = authentication;
	const localAccessToken = localStorage.getItem("token");
	const localRefreshToken = localStorage.getItem("refreshToken");
	const mountedRef = useRef(true);
	// const [notificationsData, setNotificationsData] = useState([]);
	let notificationsData = [];

	// --- CONFIG AXIOS ---
	axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${authentication.accessToken}`;
	axios.defaults.timeout = 15000;
	axiosInstance.defaults.baseURL =
		process.env.REACT_APP_BASE_URL || "http://localhost:5000";
	axiosInstance.defaults.headers.common[
		"Authorization"
	] = `Bearer ${authentication.accessToken}`;

	// https://medium.com/@monkov/react-using-axios-interceptor-for-token-refreshing-1477a4d5fc26
	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(err) => {
			console.log(err.response);
			if (
				err.response.data.message === "Invalid username or password!" ||
				err.response.data.from === "LOGIN"
			)
				return err.response.data;

			if (err.response.status !== 401) {
				return err.response.data;
			}

			return new Promise((resolve, reject) => {
				const originalReq = err.config;

				if (
					err.response.status === 401 &&
					err.config &&
					!err.config.__isRetryRequest &&
					err.response.data.message !== "Invalid username or password!"
				) {
					originalReq._retry = true;

					let res = fetch("http://localhost:5000/api/auth/refresh", {
						method: "POST",
						mode: "cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							"Content-Type": "application/json",
							Device: "device",
							Token: localStorage.getItem("token"),
						},
						redirect: "follow",
						referrer: "no-referrer",
						body: JSON.stringify({
							accessToken: localStorage.getItem("token"),
							refreshToken: localStorage.getItem("refreshToken"),
						}),
					})
						.then((res) => res.json())
						.then((res) => {
							console.log(res);
							originalReq.headers[
								"Authorization"
							] = `Bearer ${res.accessToken}`;
							originalReq.headers["Device"] = "device";
							localStorage.setItem("token", res.accessToken);
							setUserAccessToken(res.accessToken);

							return axios(originalReq);
						});

					resolve(res);
				}

				return Promise.reject(err);
			});
		}
	);

	// --- GETTING NOTIFICATION && LONG POLLING WITH SERVER
	let isGettingAList = true;
	let isQueryingNotification = true;

	useEffect(() => {
		console.log(process.env.REACT_APP_BASE_URL);
		if (!mountedRef.current) return null;

		return () => {
			mountedRef.current = false;
			isGettingAList = false;
			isQueryingNotification = false;
			console.log("isLoading: ", isQueryingNotification);
		};
	}, []);

	let ts = 0;
	let flag = 0;
	const getNotificationHistory = async () => {
		if (isQueryingNotification === false) return;
		// const fn = () => {
		await axiosInstance
			.get(`/api/notification/history?ts=${ts}`)
			.then((result) => {
				console.log("isloading at fn: ", isQueryingNotification);
				if (result.status === 200) {
					if (result.data.return_ts !== ts) {
						ts = result.data.return_ts;
						console.log("ts: ", ts);
						return result.data.data;
					}
				} else {
					if (isQueryingNotification) getNotificationHistory();
				}
			})
			.then((result) => {
				let newArray = [];
				result.forEach((element) => {
					newArray.push(element);
					if (flag !== 0) {
						openNotification(
							element.notificationTitle,
							element.notificationContent
						);
					}
				});
				notificationsData = notificationsData.concat(newArray);
				setAllNotification(notificationsData);
				console.log(notificationsData, ts);
				flag++;
				console.log("flag: ", flag);
				if (isQueryingNotification) {
					getNotificationHistory();
				}
			})
			.catch((error) => {});
		// };
	};

	// Check localStorage variables
	useEffect(() => {
		if (!mountedRef.current) return null;

		console.log(localAccessToken);
		if (localAccessToken && localRefreshToken) {
			if (!authentication.accessToken || !authentication.refreshToken) {
				setUserAccessToken(localAccessToken);
				setUserRefreshToken(localRefreshToken);
			}
		} else {
			setUserAccessToken(null);
			setUserRefreshToken(null);
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		}
	}, [localAccessToken, localRefreshToken]);

	// Check if accessToken is valid
	useEffect(() => {
		if (!mountedRef.current || isQueryingNotification === false) return null;

		if (
			authentication.accessToken &&
			authentication.accessToken != "undefined"
		) {
			setRole(jwtDecode(authentication.accessToken).role);
			axios
				.get("/api/users/me")
				.then((result) => {
					if (result.status === 200) {
						setIsAuthenticated(true);
						getAllInformation(result.data);
						getAllReceivers(authentication.accessToken);
					}
				})
				.catch((err) => {
					console.log(err);
					setIsAuthenticated(false);
					setUserAccessToken(null);
					setUserRefreshToken(null);
					localStorage.removeItem("token");
					localStorage.removeItem("refreshToken");
				});
			getNotificationHistory();
		}
		if (localAccessToken == "undefined") {
			setIsAuthenticated(false);
			setUserAccessToken(null);
			setUserRefreshToken(null);
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		}
		if (!authentication.accessToken && !localAccessToken) {
			setIsAuthenticated(false);
			setUserAccessToken(null);
			setUserRefreshToken(null);
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
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

export { axiosInstance };
export default App;
