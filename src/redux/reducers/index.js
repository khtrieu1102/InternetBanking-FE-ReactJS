import { combineReducers } from "redux";
import reducerAuthorization from "./authorization.reducer";
import reducerUserInformation from "./userInformation.reducer";

export default combineReducers({
	reducerAuthorization,
	reducerUserInformation,
});
