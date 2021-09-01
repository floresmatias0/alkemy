import React, {useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteLogin = ({component: Component, ...rest}) => {

    const [user, setUser] = useState(null)
    let logged = localStorage.getItem("user")

    useEffect(() => {
        if(logged){
            setUser(logged)
        }// eslint-disable-next-line
    },[])

    return (
      <Route {...rest}>{user ? <Redirect to='/'/> : <Component/>}</Route>
    )
}

export default PrivateRouteLogin;