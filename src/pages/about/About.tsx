import Index from "./Index";
import dhvsuImage from "@/assets/ccs.png";

export default function About() {
  return (
    <Index>
      <div
        className={`p-8 md:10 lg:p-20 w-full min-h-[30dvh] max-h-[50dvh] flex justify-center items-center bg-cover bg-center bg-no-repeat`}
        style={{
          background: `linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url(${dhvsuImage})`,
        }}
      >
        <h1 className="lg:text-3xl text-2xl font-sans text-center font-bold text-white">
          About EquickTrack: Inventory System for Laboratory Equipment with QR
          Code Scanner
        </h1>
      </div>
      <div className="w-full h-full py-8 md:py-10 md:px-20 px-14">
        <p className="text-black font-sans text-xl">
          EquickTrack is an innovative inventory management system designed to
          streamline the tracking, borrowing, and returning of laboratory
          equipment. Developed with the needs of educational institutions
        </p>

        <p className="text-black font-sans text-xl my-3 md:my-5">
          With its user-friendly interface, EquickTrack allows administrators to
          monitor and maintain an accurate inventory of equipment, ensuring that
          resources are readily available for use. The system incorporates a QR
          code scanning feature to simplify the borrowing and returning process,
          providing real-time updates and detailed logs of equipment
          transactions.
        </p>
      </div>
    </Index>
  );
}
