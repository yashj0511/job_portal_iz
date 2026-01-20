import { createContext, useContext } from "react";
import keycloak from "../keycloak";

const KeycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
  const roles =
    keycloak?.tokenParsed?.realm_access?.roles || [];

  const hasRole = (role) => roles.includes(role);

  return (
    <KeycloakContext.Provider
      value={{
        keycloak,
        roles,
        hasRole,
        user: keycloak.tokenParsed,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
