import cssImage from "@/assets/ccs.png";
import dhvsuImage from "@/assets/dhvsu.png";
import "@/index.css";
import { useEffect, useRef } from "react";
export default function AppDescription() {
  const cssImageRef = useRef<HTMLDivElement | null>(null);
  const appDescriptionRef = useRef<HTMLDivElement | null>(null);
  const parentContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          cssImageRef.current?.classList.add("css-image-fade-in");
          cssImageRef.current?.classList.remove("css-image-fade-out");
          appDescriptionRef.current?.classList.remove(
            "app-description-fade-out"
          );
          appDescriptionRef.current?.classList.add("app-description-fade-in");
        } else {
          cssImageRef.current?.classList.remove("css-image-fade-in");
          cssImageRef.current?.classList.add("css-image-fade-out");
          appDescriptionRef.current?.classList.add("app-description-fade-out");
          appDescriptionRef.current?.classList.remove(
            "app-description-fade-in"
          );
        }
      });
    });

    if (parentContainerRef.current) {
      observer.observe(parentContainerRef.current);
    }
  }, []);
  return (
    <div
      ref={parentContainerRef}
      className={`p-5 lg:p-10 md:p-7 grid md:grid-cols-2 grid-cols-1 h-fit w-full bg-cover md:gap-0 gap-5 bg-center bg-no-repeat`}
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.7)
        ), url(${dhvsuImage})`,
      }}
    >
      <div
        ref={appDescriptionRef}
        className=" w-full h-full flex items-center justify-center app-description"
      >
        <p className="text-lg md:text-xl lg:text-2xl md:text-left text-center font-sans text-white font-thin app-description">
          EquickTrack is an easy-to-use inventory system for laboratory
          equipment at Don Honorio Ventura State University's College of
          Computing Studies. It also simplifies the process of managing and
          borrowing equipment, making things easier for everyone.
        </p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div
          ref={cssImageRef}
          className="p-2 h-fit w-fit md:p-4 rounded bg-white css-image"
        >
          <img
            src={cssImage}
            alt="CSS Building"
            className=" h-52 w-80 rounded object-cover object-center aspect-square"
          />
        </div>
      </div>
    </div>
  );
}
