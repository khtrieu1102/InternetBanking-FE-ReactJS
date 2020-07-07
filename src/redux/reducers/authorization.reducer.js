import { AuthorizationActionTypes } from "../actions/actionTypes";

const initialState = {
	authentication: {
		role: "",
		accessToken: "",
		refreshToken: "",
	},
	isLoading: false,
	isAuthenticated: true,
	error: null,
	message: null,
};

const reducerAuthorization = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case AuthorizationActionTypes.AUTH_SET_ACCESS_TOKEN: {
			return {
				...state,
				authentication: {
					...state.authentication,
					accessToken: payload,
				},
			};
		}
		case AuthorizationActionTypes.AUTH_SET_REFRESH_TOKEN: {
			return {
				...state,
				authentication: {
					...state.authentication,
					refreshToken: payload,
				},
			};
		}
		case AuthorizationActionTypes.AUTH_SET_IS_AUTHENTICATED: {
			return {
				...state,
				isAuthenticated: payload,
			};
		}
		case AuthorizationActionTypes.AUTH_SET_ROLE: {
			return {
				...state,
				authentication: {
					...state.authentication,
					role: payload,
				},
			};
		}
		default:
			return state;
	}
};

export default reducerAuthorization;
