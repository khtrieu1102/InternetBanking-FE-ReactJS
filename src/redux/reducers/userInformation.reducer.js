import { UserInformationActionTypes } from "../actions/actionTypes";

const initialState = {
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
};

const reducerUserInformation = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case UserInformationActionTypes.USER_GET_ALL_INFORMATION: {
			return {
				...state,
				id: payload._id,
				accountNumber: payload.accountNumber,
				username: payload.username,
				name: payload.name,
				email: payload.email,
				phone: payload.phone,
				status: payload.status,
				role: payload.role,
				balance: payload.balance,
			};
		}
		default:
			return state;
	}
};

export default reducerUserInformation;
