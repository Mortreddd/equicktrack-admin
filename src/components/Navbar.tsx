import { useRef } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Button } from "./common/Button";
import { LoginModal } from "./modals/LoginModal";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RegisterModal } from "./modals/RegisterModal";

export default function Navbar() {
  const loginRef = useRef<HTMLDialogElement>(null);
  const registerRef = useRef<HTMLDialogElement>(null);

  const { authToken } = useAuth();

  function handleLoginModal() {
    loginRef.current?.showModal();
  }

  function handleRegisterModal() {
    registerRef.current?.showModal();
  }

  return (
    <nav className="w-full py-4 shadow-md px-20 bg-primary flex justify-between items-center">
      <div className="w-auto h-fit flex gap-2 items-center">
        <ApplicationLogo />
        <h1 className="text-white text-xl font-semibold">Equicktrack</h1>
      </div>
      <div className="flex items-center gap-5">
        {authToken ? (
          <Link to="/dashboard">
            <Button variant={"light"} rounded={"default"}>
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Button
              onClick={handleLoginModal}
              variant={"light"}
              rounded={"default"}
            >
              Login
            </Button>

            <LoginModal ref={loginRef} />
            <Button
              onClick={handleRegisterModal}
              variant={"light"}
              rounded={"default"}
            >
              Sign Up
            </Button>
            <RegisterModal ref={registerRef} />
          </>
        )}
      </div>
    </nav>
  );
}
