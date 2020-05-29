import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AuthorizationActionCreators } from '../../redux/actions/index';
import Navbar from './Navbar/Navbar';

const mapStateToProps = state => ({ reducerAuthorization: state.reducerAuthorization });

const mapDispatchToProps = {
  setUserToken: AuthorizationActionCreators.setUserToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
