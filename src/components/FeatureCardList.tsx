import qrcodeScanImage from "@/assets/qrcode-scan.jpg";
import quickInventoryImage from "@/assets/quick-inventory.jpg";
import secureAccessImage from "@/assets/secure-access.jpg";
import userFriendlyImage from "@/assets/user-friendly.jpg";
import { useEffect, useRef } from "react";
import "@/index.css";
import FeatureCard from "./FeatureCard";

interface FeatureCardData {
  src: string;
  title: string;
  description: string;
}

const featureCardsData: Array<FeatureCardData> = [
  {
    src: quickInventoryImage,
    title: "Quick Inventory",
    description:
      "Easily keep your inventory up to date with fast updates. Add, remove, or change items quickly to maintain an accurate view of your laboratory equipment",
  },
  {
    src: qrcodeScanImage,
    title: "Easy QR Code Scanning",
    description:
      "Easily borrow equipment by scanning the QR code on the item. This quickly brings up the item’s details and starts the borrowing process",
  },
  {
    src: userFriendlyImage,
    title: "User Friendly",
    description:
      "Our user-friendly interface allows you to access all features quickly, making inventory management simple for everyone",
  },
  {
    src: secureAccessImage,
    title: "Secure Access",
    description:
      "Keep your data safe with strong security measures. Our secure access system ensures that only authorized users can manage the inventory, protecting sensitive information from unauthorized access",
  },
];

export default function FeatureCardList() {
  const featureCardContainerRef = useRef<HTMLDivElement | null>(null);

  const featureCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featureCardsRef.current.forEach((card, index) => {
            setTimeout(() => {
              card?.classList.add("feature-card-fade-in");
              card?.classList.remove("feature-card-fade-out");
            }, index * 200);
          });
        } else {
          featureCardsRef.current.forEach((card) => {
            card?.classList.add("feature-card-fade-out");
            card?.classList.remove("feature-card-fade-in");
          });
        }
      });
    });

    if (featureCardContainerRef.current) {
      featureCardsRef.current.forEach((card) => {
        if (card) observer.observe(card);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      ref={featureCardContainerRef}
      className="w-full h-fit p-4  grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 grid-rows-4 gap-5 place-content-center lg:grid-cols-4 md:p-16"
    >
      {featureCardsData.map((data, key) => (
        <div
          key={key}
          ref={(el) => (featureCardsRef.current[key] = el)}
          className={`h-full w-full feature-card`}
        >
          <div className="w-full h-full">
            <div className="w-full flex justify-center items-center">
              <FeatureCard src={data.src} />
            </div>
            <h3 className="text-center text-lg md:text-xl font-sans md:my-3 my-1 text-[#031541]">
              {data.title}
            </h3>
            <p className="text-center text-gray-700 font-sans md:text-sm text-xs lg:text-md px-4 md:p-0">
              {data.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
