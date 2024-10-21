import HomeLayout from "@/layouts/HomeLayout";
import Navbar from "@/components/Navbar";
import "@/index.css";

export default function Home() {
  return (
    <main className="antialiased bg-white">
      <Navbar />
      <div className="w-full h-full">
        <HomeLayout />
      </div>
    </main>
  );
}
