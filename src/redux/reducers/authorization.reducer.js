import { AuthorizationActionTypes } from "../actions/actionTypes";

const initialState = {
	authentication: {
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
		case AuthorizationActionTypes.AUTH_SET_IS_AUTHENTICATED: {
			return {
				...state,
				isAuthenticated: payload,
			};
		}
		default:
			return state;
	}
};

export default reducerAuthorization;
