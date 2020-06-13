import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserInformationActionCreators } from "../../../../redux/actions/index";
import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {
	getAllInformation: UserInformationActionCreators.getAllInformation,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
