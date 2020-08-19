import {
	AuthorizationActionTypes,
	UserInformationActionTypes,
	UserTransactionsActionTypes,
	UserNotificationActionTypes,
} from "./actionTypes";
import axios from "axios";

export const AuthorizationActionCreators = {
	setUserAccessToken: (accessToken) => ({
		type: AuthorizationActionTypes.AUTH_SET_ACCESS_TOKEN,
		payload: accessToken,
	}),
	setUserRefreshToken: (refreshToken) => ({
		type: AuthorizationActionTypes.AUTH_SET_REFRESH_TOKEN,
		payload: refreshToken,
	}),
	setIsAuthenticated: (value) => ({
		// value: "true" or "false"
		type: AuthorizationActionTypes.AUTH_SET_IS_AUTHENTICATED,
		payload: value,
	}),
	setRole: (value) => ({
		type: AuthorizationActionTypes.AUTH_SET_ROLE,
		payload: value,
	}),
};

export const UserInformationActionCreators = {
	getAllInformation: (objectUser) => ({
		type: UserInformationActionTypes.USER_GET_ALL_INFORMATION,
		payload: objectUser,
	}),
	getAllReceivers: (token) => ({
		type: UserInformationActionTypes.USER_GET_ALL_RECEIVERS,
		payload: new Promise((resolve, reject) =>
			axios
				.get(`/api/users/receiver-list`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((result) => {
					// console.log(result.data.data);
					if (result.status === 200) resolve(result.data);
				})
				.catch((error) => {
					reject(error);
				})
		),
	}),
	updateUserInfo: (entity, token) => ({
		type: UserInformationActionTypes.USER_UPDATE_INFORMATION,
		payload: new Promise((resolve, reject) =>
			axios
				.patch(`/api/users/me`, entity, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				})
		),
	}),
};

export const UserTransactionsActionCreators = {
	getAllTransactions: (token) => ({
		type: UserTransactionsActionTypes.USER_GET_ALL_TRANSACTIONS,
		payload: new Promise((resolve, reject) =>
			axios
				.get(`/api/transaction/history`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((result) => {
					if (result.status === 200) resolve(result.data.data);
				})
				.catch((error) => {
					reject(error);
				})
		),
	}),
};

export const UserNotificationActionCreators = {
	setAllNotification: (valueList) => ({
		type: UserNotificationActionTypes.USER_SET_ALL_NOTIFICATION,
		payload: valueList,
	}),
};
