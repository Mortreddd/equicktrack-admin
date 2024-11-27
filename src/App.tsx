import { BrowserRouter, Routes, Route } from "react-router-dom";
import { guestRoutes, protectedRoutes } from "./Router";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const { authToken, currentUser } = useAuth();

  const isVerifiedUser =
    authToken != null &&
    currentUser?.emailVerifiedAt !== null;

  const isEmailNotVerified =
    authToken !== null && currentUser?.emailVerifiedAt === null;

  return (
    <BrowserRouter>
      <Routes>
        {guestRoutes.map((router, index) => (
          <Route key={index} {...router} />
        ))}
        <Route
          element={
            <ProtectedRoute
              isVerifiedUser={isVerifiedUser}
              isEmailNotVerified={isEmailNotVerified}
            />
          }
        >
          {protectedRoutes.map((router, index) => (
            <Route key={index} {...router} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
