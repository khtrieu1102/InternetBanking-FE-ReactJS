import { UserInformationActionTypes } from "../actions/actionTypes";

const initialState = {
	data: {
		id: -1,
		accountNumber: "",
		username: "",
		name: "",
		email: "",
		phone: "",
		receivers: [],
		status: true,
		role: "",
		balance: -1,
	},
	isLoading: false,
	message: null,
	error: null,
};

const reducerUserInformation = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case UserInformationActionTypes.USER_GET_ALL_INFORMATION: {
			return {
				...state,
				data: {
					id: payload._id,
					accountNumber: payload.accountNumber,
					username: payload.username,
					name: payload.name,
					email: payload.email,
					phone: payload.phone,
					status: payload.status,
					role: payload.role,
					balance: payload.balance,
				},
			};
		}
		case UserInformationActionTypes.USER_UPDATE_INFORMATION_PENDING: {
			return {
				...state,
				isLoading: true,
				message: null,
				error: null,
			};
		}
		case UserInformationActionTypes.USER_UPDATE_INFORMATION_FULFILLED: {
			return {
				...state,
				data: {
					...state.data,
					name: payload.name,
					email: payload.email,
					phone: payload.phone,
				},
				isLoading: false,
				message: null,
				error: null,
			};
		}
		case UserInformationActionTypes.USER_UPDATE_INFORMATION_PENDING: {
			return {
				...state,
				isLoading: false,
				message: "Error when updating information!",
				error: payload,
			};
		}
		default:
			return state;
	}
};

export default reducerUserInformation;
