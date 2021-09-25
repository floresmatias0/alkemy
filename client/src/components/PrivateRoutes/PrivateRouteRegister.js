import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteRegister = ({USER, component: Component, ...rest}) => {
    return (
      <Route {...rest}>{USER ? <Redirect to='/login'/> : <Component/>}</Route>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.userReducer.user
    }
}

export default connect(mapStateToProps)(PrivateRouteRegister);