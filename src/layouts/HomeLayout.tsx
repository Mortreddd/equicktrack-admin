import { Button } from "@/components/common/Button";

export default function HomeLayout() {
  return (
    <div className="w-full h-[90dvh]">
      <div className="w-full h-full bg-blue-100 flex justify-center items-center">
        <div className="h-fit w-96 space-y-5 flex flex-col items-center">
          <h1 className="text-5xl font-semibold text-black font-sans text-center">
            EQUICKTRACK
          </h1>
          <p className="text-center text-xl text-gray-700 font-sans">
            EquickTrack is an Inventory System for Laboratory Equipment at Don
            Honorio Ventura State University College of Computing Studies,
            featuring QR Code Scanner capabilities.
          </p>
          <Button variant={"primary"} rounded={"default"} className="">
            Download App
          </Button>
        </div>
      </div>
    </div>
  );
}
