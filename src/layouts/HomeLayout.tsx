import AppDescription from "@/components/AppDescription";
import { Button } from "@/components/common/Button";
import FeatureCardList from "@/components/FeatureCardList";
import Footer from "@/components/Footer";
export default function HomeLayout() {
  // const observers = new IntersectionObserver();
  return (
    <div className="w-full h-full">
      <div className="w-full h-[90dvh] bg-[#273760] md:p-20 p-12">
        <div className="w-96 h-full flex flex-col space-y-5  items-start justify-center">
          <h1 className="text-4xl font-sans font-semibold text-white">
            EquickTrack
          </h1>
          <p className="text-lg font-sans text-gray-200">
            EquickTrack is an Inventory System for Laboratory Equipment at Don
            Honorio Ventura State University College of Computing Studies,
            featuring QR Code Scanner capabilities.
          </p>
          <Button variant={"primary"} rounded={"default"} className="">
            Download App
          </Button>
        </div>
      </div>
      <div className="w-full h-full">
        <AppDescription />
      </div>
      <div className="w-full h-full">
        <FeatureCardList />
      </div>
      <div className="w-full h-full">
        <Footer />
      </div>
    </div>
  );
}
