import { UserNotificationActionTypes } from "../actions/actionTypes";

const initialState = {
	data: [],
	isLoading: false,
	isAuthenticated: true,
	error: null,
	message: null,
};

const reducerUserNotification = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case UserNotificationActionTypes.USER_SET_ALL_NOTIFICATION: {
			return {
				...state,
				data: payload.slice(),
			};
		}
		default:
			return state;
	}
};

export default reducerUserNotification;
