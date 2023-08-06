import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="btn dark fixed left"
      onClick={() =>
        logout({
          logoutParams: { returnTo: import.meta.env.VITE_BASE_URL },
        })
      }
    >
      Esci
    </button>
  );
};

export default LogoutButton;
