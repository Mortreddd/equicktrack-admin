import { useRef } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Button } from "./common/Button";
import LoginModal from "./modals/LoginModal";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ModalRef } from "@/components/common/Modal.tsx";

export default function Navbar() {
  const loginRef = useRef<ModalRef>(null);
  const { authToken, currentUser, isVerifiedUser } = useAuth();

  function handleLoginModal() {
    loginRef.current?.open();
  }

  const redirectionUrl = () => {
    if (isVerifiedUser) {
      return "/dashboard";
    } else if (currentUser?.emailVerifiedAt === null) {
      return "/auth/verify-email";
    }
  };
  return (
    <nav className="w-full py-2 md:py-4 shadow-md px-5 md:px-10 lg:px-20 bg-[#003b89] sticky top-0 z-50 flex justify-between items-center">
      <Link to={"/"} className="flex items-center gap-2">
        <ApplicationLogo />
        <p className="lg:text-2xl md:text-xl font-sans font-semibold sm:text-lg text-white">
          EquickTrack
        </p>
      </Link>
      <div className="flex items-center gap-5">
        {authToken ? (
          <Link to={redirectionUrl() ?? "/dashboard"}>
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
