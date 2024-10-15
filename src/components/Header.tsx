import { Search } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className="h-24 flex justify-center items-center">
        <div className="text-sky-950">
          <h1 className="text-5xl font-bold">NEWSNOW</h1>
          <p className="text-xs text-center font-semibold">- EST. 2024 -</p>
        </div>
      </div>
      <div className="bg-sky-950 h-14">
        <div className="max-w-screen-lg h-full m-auto flex">
          <nav className="my-auto">
            <ul className="flex gap-14 text-white font-bold">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/news/politics">Politics</a>
              </li>
              <li>
                <a href="/news/politics">Sports</a>
              </li>
              <li>
                <a href="/news/health">Health</a>
              </li>
              <li>
                <a href="/news/business">Business</a>
              </li>
              <li>
                <a href="/news/travel">Travel</a>
              </li>
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
