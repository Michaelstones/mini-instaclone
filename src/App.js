import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/route";
import useAuthlistener from "./hooks/use-Auth-listener";
import UserContext from "./contexts/User";
import ProctedRoute from "./helpers/protected-route";
function App() {
  // user validator context
  const { user } = useAuthlistener();

  const Login = lazy(() => import("./pages/Login"));
  const SignUp = lazy(() => import("./pages/signup"));
  const Dashboard = lazy(() => import("./pages/dashboard"));
  const Profile = lazy(() => import("./pages/profile"));
  const NotFound = lazy(() => import("./pages/not-found"));
  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route
            index
            element={
              <ProctedRoute user={user}>
                <Dashboard />
              </ProctedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
