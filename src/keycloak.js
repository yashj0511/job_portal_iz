import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",   // Keycloak server
  realm: "master",
  clientId: "react-client",
});

export default keycloak;
