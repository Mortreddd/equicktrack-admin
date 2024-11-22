import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Tab from "@/components/Tab";
import { PropsWithChildren } from "react";

interface AboutIndexProps extends PropsWithChildren {}
export default function Index({ children }: AboutIndexProps) {
  return (
    <main className="w-full h-[100dvh] bg-white antialiased">
      <div className="w-full h-fit">
        <Navbar />
      </div>
      <div className="w-full bg-[#bad8ff] h-fit py-4 px-10 md:px-20 flex md:justify-start md:gap-10 gap-5 justify-center items-center">
        <Tab to={"/about"}>About</Tab>
        <Tab to={"/terms-privacy"}>Terms & Privacy</Tab>
        <Tab to={"/privacy-policy"}>Privay Policy</Tab>
      </div>
      <div className="w-full h-full">{children}</div>
      <div className="md:my-5 my-3">
        <Footer />
      </div>
    </main>
  );
}
