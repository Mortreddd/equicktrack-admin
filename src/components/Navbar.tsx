import { useRef } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Button } from "./common/Button";
import LoginModal  from "./modals/LoginModal";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {ModalRef} from "@/components/common/Modal.tsx";

export default function Navbar() {
  const loginRef = useRef<ModalRef>(null);
  const { authToken, currentUser, isVerifiedUser } = useAuth();

  function handleLoginModal() {
    loginRef.current?.open();
  }

  const redirectionUrl = () => {
    if (isVerifiedUser) {
      return "/dashboard";
    } else if (currentUser?.contactNumberVerifiedAt === null) {
      return "/auth/verify-phone";
    } else if (currentUser?.emailVerifiedAt === null) {
      return "/auth/verify-email";
    }
  };
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
          <a href={redirectionUrl()}>
            <Button variant={"light"} rounded={"default"}>
              Dashboard
            </Button>
          </a>
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
            <Link to={"/auth/register"} target={"_blank"}>
              <Button variant={"light"} rounded={"default"}>
                Sign Up
              </Button>
            </Link>
            {/* <RegisterModal ref={registerRef} /> */}
          </>
        )}
      </div>
    </nav>
  );
}
