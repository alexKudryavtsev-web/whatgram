import { useRoutes } from "react-router-dom";

import AuthContext from "./contexts/AuthContext.js";
import useAuth from "./hooks/useAuth.js";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import Header from "./components/header/Header.jsx";

function RoutesComponent({ isAuth }) {
  const routes = useRoutes(isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES);

  return routes;
}

function App() {
  const auth = useAuth();
  const isAuth = Boolean(auth.token);

  return (
    <AuthContext.Provider value={{ ...auth, isAuth }}>
      <>
        <Header isAuth={isAuth} />
        <RoutesComponent isAuth={isAuth} />
      </>
    </AuthContext.Provider>
  );
}

export default App;
