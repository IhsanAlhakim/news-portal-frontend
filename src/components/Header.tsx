import { Search } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/news/search?query=${searchQuery}`;
  };

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
              <a
                href={"/"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Home</p>
                </li>
              </a>
              <a
                href={"/news/politics"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Politics</p>
                </li>
              </a>
              <a
                href={"/news/sports"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Sports</p>
                </li>
              </a>
              <a
                href={"/news/health"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Health</p>
                </li>
              </a>
              <a
                href={"/news/business"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Business</p>
                </li>
              </a>
              <a
                href={"/news/travel"}
                className="h-full flex items-center hover:bg-sky-800 transition-all"
              >
                <li className="pl-5 pr-5">
                  <p>Travel</p>
                </li>
              </a>
            </ul>
          </nav>
          <div className="ml-auto my-auto bg-white bg-opacity-40 rounded pl-2 pr-2">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search News..."
                className="text-sm text-white bg-transparent p-2 w-[250px] outline-none placeholder-white"
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
