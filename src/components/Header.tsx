import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="grid grid-rows-[calc(100%-56px)_56px]">
      <div className="flex justify-center items-center">
        <div className="text-sky-950">
          <h1 className="text-5xl font-bold">NEWSNOW</h1>
          <p className="text-xs text-center font-semibold">- EST. 2024 -</p>
        </div>
      </div>
      <div className="bg-sky-950">
        <div className="max-w-screen-lg h-full m-auto flex">
          <nav className="my-auto h-full">
            <ul className="flex gap-5 text-white font-bold h-full items-center">
              <Link
                to={"/"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Home</p>
                </li>
              </Link>
              <Link
                to={"/news/politics"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Politics</p>
                </li>
              </Link>
              <Link
                to={"/news/sports"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Sports</p>
                </li>
              </Link>
              <Link
                to={"/news/health"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Health</p>
                </li>
              </Link>
              <Link
                to={"/news/business"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Business</p>
                </li>
              </Link>
              <Link
                to={"/news/travel"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Travel</p>
                </li>
              </Link>
            </ul>
          </nav>
          <div className="ml-auto my-auto flex bg-white bg-opacity-40 rounded items-center pl-2 pr-2">
            <input
              type="text"
              placeholder="Search News..."
              className="text-sm text-white bg-transparent p-2 w-[250px] outline-none placeholder-white"
            />
            <Search className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
