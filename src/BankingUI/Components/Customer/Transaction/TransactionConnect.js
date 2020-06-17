import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	// AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import Transaction from "./Transaction";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {
	getAllReceivers: UserInformationActionCreators.getAllReceivers,
	getReceiverList: UserInformationActionCreators.getReceiverList,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Transaction)
);
