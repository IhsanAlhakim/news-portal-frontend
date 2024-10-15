import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideSection from "@/components/SideSection";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="mt-14 mb-14">
          <div className="max-w-screen-xl mx-auto flex">
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
