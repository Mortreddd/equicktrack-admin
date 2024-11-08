import { useRef } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Button, buttonVariant } from "./common/Button";
import { LoginModal } from "./modals/LoginModal";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RegisterModal } from "./modals/RegisterModal";
import { cn } from "@/utils/StyleUtil";
import { useAlert } from "@/contexts/AlertContext";

export default function Navbar() {
  const loginRef = useRef<HTMLDialogElement>(null);
  const registerRef = useRef<HTMLDialogElement>(null);

  const { authToken } = useAuth();
  const { showAlert } = useAlert();

  function handleLoginModal() {
    loginRef.current?.showModal();
    showAlert("This is a test message", "success");
  }

  return (
    <nav className="w-full py-4 shadow-md px-20 bg-[#003b89] sticky top-0 z-50 flex justify-between items-center">
      <div className="w-auto h-fit flex gap-2 items-center">
        <ApplicationLogo />
        <h1 className="text-white text-md md:text-xl font-semibold">
          Equicktrack
        </h1>
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
            <Link
              to={"/auth/register"}
              target={"_blank"}
              className={cn(
                buttonVariant({ variant: "light", rounded: "default" })
              )}
            >
              Sign Up
            </Link>
            {/* <RegisterModal ref={registerRef} /> */}
          </>
        )}
      </div>
    </nav>
  );
}
