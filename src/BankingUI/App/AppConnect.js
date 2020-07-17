import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	AuthorizationActionCreators,
	UserInformationActionCreators,
	UserTransactionsActionCreators,
	UserNotificationActionCreators,
} from "../../redux/actions/index";
import App from "./App";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
		reducerUserTransactions: state.reducerUserTransactions,
		reducerUserNotification: state.reducerUserNotification,
	};
};

const mapDispatchToProps = {
	setUserAccessToken: AuthorizationActionCreators.setUserAccessToken,
	setIsAuthenticated: AuthorizationActionCreators.setIsAuthenticated,
	setRole: AuthorizationActionCreators.setRole,
	getAllInformation: UserInformationActionCreators.getAllInformation,
	getAllReceivers: UserInformationActionCreators.getAllReceivers,
	getAllTransactions: UserTransactionsActionCreators.getAllTransactions,
	setUserRefreshToken: AuthorizationActionCreators.setUserRefreshToken,
	setAllNotification: UserNotificationActionCreators.setAllNotification,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
