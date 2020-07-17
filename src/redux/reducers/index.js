import { combineReducers } from "redux";
import reducerAuthorization from "./authorization.reducer";
import reducerUserInformation from "./userInformation.reducer";
import reducerUserTransactions from "./userTransactionsInformation.reducer";
import reducerUserNotification from "./userNotification.reducer";

export default combineReducers({
	reducerAuthorization,
	reducerUserInformation,
	reducerUserTransactions,
	reducerUserNotification,
});
