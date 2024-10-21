import ApplicationLogo from "./ApplicationLogo";

export default function Footer() {
  return (
    <footer
      className={
        "lg:py-8 md:py-5 py-3 bg-primary lg:px-10 md:px-7 px-5 w-full h-full"
      }
    >
      <div className="w-full h-full flex justify-center">
        <ApplicationLogo />
      </div>
    </footer>
  );
}
