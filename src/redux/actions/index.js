import {
	AuthorizationActionTypes,
	UserInformationActionTypes,
} from "./actionTypes";
import axios from "axios";

const PORT_SERVER = process.env.PORT_SERVER || 5000;
const HOST_SERVER = process.env.HOST_SERVER || "localhost";
const URL_API = `http://${HOST_SERVER}:${PORT_SERVER}`;

export const AuthorizationActionCreators = {
	setUserAccessToken: (accessToken) => ({
		type: AuthorizationActionTypes.AUTH_SET_ACCESS_TOKEN,
		payload: accessToken,
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
	updateUserInfo: (entity, token) => ({
		type: UserInformationActionTypes.USER_UPDATE_INFORMATION,
		payload: new Promise((resolve, reject) =>
			axios
				.patch(`${URL_API}/api/users/me`, entity, {
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
