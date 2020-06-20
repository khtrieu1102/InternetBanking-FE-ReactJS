import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	// AuthorizationActionCreators,
	UserInformationActionCreators,
} from "../../../../redux/actions/index";
import NewCustomerForm from "./NewCustomerForm";

const mapStateToProps = (state) => {
	return {
		reducerAuthorization: state.reducerAuthorization,
		reducerUserInformation: state.reducerUserInformation,
	};
};

const mapDispatchToProps = {
	updateUserInfo: UserInformationActionCreators.updateUserInfo,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewCustomerForm)
);
