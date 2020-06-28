import { UserTransactionsActionTypes } from "../actions/actionTypes";

const initialState = {
	data: [],
	isLoading: false,
	message: null,
	error: null,
};

const reducerUserTransactions = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case UserTransactionsActionTypes.USER_GET_ALL_TRANSACTIONS_FULFILLED: {
			return {
				...state,
				data: payload,
				isLoading: false,
				message: null,
				error: null,
			};
		}
		case UserTransactionsActionTypes.USER_GET_ALL_TRANSACTIONS_REJECTED: {
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

export default reducerUserTransactions;
