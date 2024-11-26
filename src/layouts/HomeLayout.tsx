import AppDescription from "@/components/AppDescription";
import { Button } from "@/components/common/Button";
import FeatureCardList from "@/components/FeatureCardList";
import Footer from "@/components/Footer";
import { useAlert } from "@/contexts/AlertContext";
import { useState } from "react";

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
      <div className="w-full h-[90dvh] bg-[#273760] md:p-20 p-8">
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
