import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	// AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import Notification from "./Notification";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
		reducerUserTransactions: state.reducerUserTransactions,
		reducerUserNotification: state.reducerUserNotification,
	};
};

const mapDispatchToProps = {};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Notification)
);
