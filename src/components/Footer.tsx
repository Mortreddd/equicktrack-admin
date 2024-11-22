import { Link } from "react-router-dom";
import ApplicationLogo from "./ApplicationLogo";

export default function Footer() {
  return (
    <footer
      className={
        "lg:py-8 md:py-5 py-3 bg-primary lg:px-10 md:px-7 px-5 w-full h-full"
      }
    >
      <div className="w-auto h-fit flex flex-col gap-2 items-center justify-start">
        <ApplicationLogo />
        <div className="flex md:gap-10 gap-5 items-center">
          <Link
            to={"/about"}
            className="md:text-lg text-md text-white font-sans font-semibold transition-all duration-200 ease-in-out hover:text-gray-200 hover:underline"
          >
            About
          </Link>
          <Link
            to={"/terms-privacy"}
            className="md:text-lg text-md text-white font-sans font-semibold transition-all duration-200 ease-in-out hover:text-gray-200 hover:underline"
          >
            Terms & Privacy
          </Link>
          <Link
            to={"/privacy-policy"}
            className="md:text-lg text-md text-white font-sans font-semibold transition-all duration-200 ease-in-out hover:text-gray-200 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="w-full md:mt-5 mt-3 flex justify-end">
          <p className="md:text-lg text-md text-white font-sans font-semibold">
            2024 &copy; all right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
