import AppDescription from "@/components/AppDescription";
import { Button } from "@/components/common/Button";
import FeatureCardList from "@/components/FeatureCardList";
import Footer from "@/components/Footer";
import { useAlert } from "@/contexts/AlertContext";
import { useState } from "react";
import homeImage from "@/assets/home-pic.webp";

export default function HomeLayout() {
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleDownload() {
    const apkUrl = "/apk/equicktrack.apk";
    if (apkUrl) {
      const fileName = `equicktrack-app.apk`;
      try {
        setIsLoading(true);
        const response = await fetch(apkUrl);
        const blob = await response.blob();
        const createdObject = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = createdObject;
        link.download = `${fileName}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(createdObject);
        showAlert("Download started.", "success");
        setIsLoading(false);
      } catch (error) {
        showAlert("Something went wrong. Please try again later.", "error");
      }
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit md:h-[90dvh] bg-[#273760] md:p-20 px-8 py-12">
        <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-between space-y-5 md:space-y-0">
          <div className="w-full md:w-96 h-full flex flex-col space-y-5 items-center md:items-start justify-start md:justify-center">
            <h1 className="text-4xl font-sans font-semibold text-white">
              EquickTrack
            </h1>
            <p className="text-lg font-sans text-gray-200">
              EquickTrack is an Inventory System for Laboratory Equipment at Don
              Honorio Ventura State University College of Computing Studies,
              featuring QR Code Scanner capabilities.
            </p>
            <Button
              variant={"primary"}
              rounded={"default"}
              className=""
              loading={isLoading}
              onClick={() => handleDownload()}
            >
              Download App
            </Button>
          </div>
          <div className="flex-1 flex w-full md:justify-end css-image-fade-in">
            <img
              src={homeImage}
              alt="home-pic"
              className="object-contain rounded-xl md:rounded-xl object-center"
            />
          </div>
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
