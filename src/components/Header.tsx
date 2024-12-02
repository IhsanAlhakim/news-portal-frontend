import { Search, X } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/news/search?query=${searchQuery}`;
  };

  return (
    <header>
      <div className="h-[80px] md:h-[100px] lg:h-[110px] flex px-5 lg:px-0 lg:justify-center items-center">
        <div className={`text-sky-950 ${showSearch && "hidden"} md:block`}>
          <h1 className="text-2xl md:text-5xl font-bold">NEWSNOW</h1>
          <p className="text-xs text-center font-semibold">- EST. 2024 -</p>
        </div>
        <div className={`ml-auto ${showSearch && "hidden"} md:hidden`}>
          <button
            onClick={() => setShowSearch(true)}
            className="p-4 hover:bg-sky-950 hover:bg-opacity-50 rounded-xl"
          >
            <Search />
          </button>
        </div>
        <div
          className={`px-2 md:ml-auto bg-sky-950 rounded ${
            !showSearch && "hidden"
          } md:block lg:hidden`}
        >
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search News..."
              className="w-[230px] md:w-[320px] p-2 py-3 text-base text-white bg-transparent outline-none placeholder-white"
              onChange={handleChange}
              value={searchQuery}
            />
            <button type="submit">
              <Search className="text-white" />
            </button>
          </form>
        </div>
        <div
          className={`ml-auto flex items-center ${
            !showSearch && "hidden"
          } md:hidden`}
        >
          <button
            onClick={() => setShowSearch(false)}
            className="p-1 hover:bg-sky-950 hover:bg-opacity-50 rounded-xl"
          >
            <X size={35} className="text-sky-950" />
          </button>
        </div>
      </div>
      <div className="h-[56px] bg-sky-950 relative md:flex">
        <div className="md:hidden absolute left-0 h-full w-10 bg-gradient-to-r from-sky-950 to-transparent" />
        <div className="md:hidden absolute right-0 h-full w-10 bg-gradient-to-l from-sky-950 to-transparent" />
        <div className="h-full m-auto flex lg:gap-5 overflow-x-auto">
          <nav className="h-full my-auto">
            <ul className="h-full flex gap-5 text-white font-bold items-center">
              <a
                href={"/"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Home</p>
                </li>
              </a>
              <a
                href={"/news/politics"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Politics</p>
                </li>
              </a>
              <a
                href={"/news/sports"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Sports</p>
                </li>
              </a>
              <a
                href={"/news/health"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Health</p>
                </li>
              </a>
              <a
                href={"/news/business"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Business</p>
                </li>
              </a>
              <a
                href={"/news/travel"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="px-5">
                  <p>Travel</p>
                </li>
              </a>
            </ul>
          </nav>
          <div className="ml-auto my-auto px-2 bg-white bg-opacity-40 rounded hidden lg:block">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search News..."
                className="w-[250px] p-2 text-sm text-white bg-transparent outline-none placeholder-white"
                onChange={handleChange}
                value={searchQuery}
              />
              <button type="submit">
                <Search className="text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
