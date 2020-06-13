import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AuthorizationActionCreators } from "../../../../redux/actions/index";
import Navbar from "./Navbar";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {
	setIsAuthenticated: AuthorizationActionCreators.setIsAuthenticated,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
