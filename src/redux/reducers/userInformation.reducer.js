import { UserInformationActionTypes } from "../actions/actionTypes";

const initialState = {
	data: {
		id: -1,
		accountNumber: "",
		username: "",
		name: "",
		email: "",
		phone: "",
		status: true,
		role: "",
		balance: -1,
	},
	receivers: [],
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
		// case UserInformationActionTypes.USER_UPDATE_INFORMATION_PENDING: {
		// 	return {
		// 		...state,
		// 		isLoading: true,
		// 		message: "",
		// 		error: "",
		// 	};
		// }
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
		case UserInformationActionTypes.USER_UPDATE_INFORMATION_REJECTED: {
			return {
				...state,
				isLoading: false,
				message: "Error when updating information!",
				error: payload,
			};
		}
		case UserInformationActionTypes.USER_GET_ALL_RECEIVERS_PENDING: {
			return {
				...state,
				isLoading: true,
				message: null,
				error: null,
			};
		}
		case UserInformationActionTypes.USER_GET_ALL_RECEIVERS_FULFILLED: {
			return {
				...state,
				receivers: payload,
				isLoading: false,
				message: null,
				error: null,
			};
		}
		case UserInformationActionTypes.USER_GET_ALL_RECEIVERS_REJECTED: {
			return {
				...state,
				isLoading: false,
				message: "Error when getting receivers!",
				error: payload,
			};
		}

		default:
			return state;
	}
};

export default reducerUserInformation;
