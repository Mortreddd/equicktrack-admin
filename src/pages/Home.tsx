import HomeLayout from "@/layouts/HomeLayout";
import Navbar from "../components/Navbar";

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
