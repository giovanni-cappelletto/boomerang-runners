import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain='dev-w36lj5lfag1zyy2o.us.auth0.com' clientId='A7qW7XPtCojDpjHODvNg0PB3TUmNp1Ob' authorizationParams={{ redirect_uri: 'http://localhost:5173/all-events' }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
