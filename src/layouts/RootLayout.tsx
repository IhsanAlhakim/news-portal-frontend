import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideSection from "@/components/SideSection";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen grid grid-rows-[156px_calc(100%-156px)]">
        <Header />
        <main className="mt-14 mb-14">
          <div className="max-w-screen-lg mx-auto grid grid-cols-[calc(100%-300px)_300px]">
            <Outlet />
            <SideSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
