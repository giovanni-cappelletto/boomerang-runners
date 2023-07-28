import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="btn dark fixed left" onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:5173/' } })}>
      Esci
    </button>
  );
};

export default LogoutButton;