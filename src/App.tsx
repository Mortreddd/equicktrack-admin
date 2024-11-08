import { BrowserRouter, Routes, Route } from "react-router-dom";
import { guestRoutes, protectedRoutes } from "./Router";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const { authToken, currentUser } = useAuth();

  const isVerifiedUser =
    authToken != null &&
    currentUser?.emailVerifiedAt !== null &&
    currentUser?.contactNumberVerifiedAt !== null;

  const isEmailNotVerified =
    authToken !== null && currentUser?.emailVerifiedAt === null;
  const isContactNotNumberVerified =
    authToken !== null && currentUser?.contactNumberVerifiedAt === null;

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
              isContactNotNumberVerified={isContactNotNumberVerified}
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
