import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	// AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import TransactionStatistics from "./TransactionStatistics";

const mapStateToProps = (state) => {
	return {
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TransactionStatistics)
);
