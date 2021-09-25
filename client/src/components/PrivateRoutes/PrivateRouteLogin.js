import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteLogin = ({USER, component: Component, ...rest}) => {
    return (
      <Route {...rest}>{USER ? <Redirect to='/'/> : <Component/>}</Route>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.userReducer.user
    }
}

export default connect(mapStateToProps)(PrivateRouteLogin);