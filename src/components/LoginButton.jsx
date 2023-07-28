import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import './button.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button className="btn light" onClick={() => loginWithRedirect()}>Entra!</button>
}

export default LoginButton