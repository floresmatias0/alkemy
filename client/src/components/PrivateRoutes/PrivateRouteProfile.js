import React, {useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteProfile = ({component: Component, ...rest}) => {

    const [user, setUser] = useState("")
    let logged = localStorage.getItem("user")

    useEffect(() => {
        if(logged){
            setUser(logged)
        }// eslint-disable-next-line
    },[])

    return (
      <Route {...rest}>{!user ? <Redirect to='/login'/> : <Component/>}</Route>
    )
}

export default PrivateRouteProfile;