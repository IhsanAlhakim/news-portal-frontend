import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Newspaper } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <div className="min-h-screen grid grid-rows-[70px_calc(100%-70px)]">
        <header className="flex items-center pl-14 pr-14 shadow-xl ">
          <div className="flex w-full">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">NEWSNOW ADMIN</h1>
            </div>
            <div className="ml-auto flex items-center gap-5">
              <h2 className="font-semibold">Selamat Datang, Admin</h2>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="grid grid-cols-[200px_calc(100%-200px)]">
          <aside>
            <nav className="text-lg font-bold h-full">
              <ul className="flex flex-col h-full">
                <li className="p-4 hover:bg-purple-950 hover:text-white transition-all">
                  <Link to={"/dashboard"} className="flex gap-4 items-center">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </li>
                <li className="p-4 hover:bg-purple-950 hover:text-white transition-all">
                  <Link
                    to={"/dashboard/news"}
                    className="flex gap-4 items-center"
                  >
                    <Newspaper />
                    News
                  </Link>
                </li>
                <li className="p-4 hover:bg-purple-950 hover:text-white transition-all mt-auto">
                  <Link to="" className="flex gap-4 items-center">
                    <LogOut />
                    <p>Logout</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <section className="bg-slate-300 p-10 max-h-[560px] overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}
