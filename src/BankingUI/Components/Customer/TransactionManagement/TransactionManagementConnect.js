import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	// AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import TransactionManagement from "./TransactionManagement";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
		reducerUserTransactions: state.reducerUserTransactions,
	};
};

const mapDispatchToProps = {};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TransactionManagement)
);
