import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AuthorizationActionCreators } from "../../../../redux/actions/index";
import Login from "./Login";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
	};
};

const mapDispatchToProps = {
	setUserAccessToken: AuthorizationActionCreators.setUserAccessToken,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
