import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, KeyRound, Mail } from "lucide-react";

export default function Login() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-500">
      <section className="bg-white w-[800px] h-[500px] rounded-xl p-3 flex">
        <div className="w-1/2 bg-slate-50 rounded-lg flex p-5 bg-login-image bg-center bg-cover">
          <div>
            <h1 className="font-bold text-xl text-white">NEWSNOW</h1>
          </div>
          <div className="ml-auto bg-white bg-opacity-30 max-h-fit p-1 pl-2 pr-2 rounded-full">
            <div className="flex items-center">
              <p className="text-xs text-white">
                <a href="/">Back to website</a>
              </p>
              <ArrowRight size={12} className="ml-1 text-white" />
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-10 pr-10 pt-12">
          <div className="mb-8">
            <h2 className="text-blue-500 text-center text-5xl font-bold mb-1">
              Welcome
            </h2>
            <p className="text-blue-500 text-center text-sm font-normal">
              Login with Email
            </p>
          </div>
          <div>
            <form action="" className="flex flex-col gap-4">
              <div>
                <label htmlFor="" className="font-semibold">
                  Nama
                </label>
                <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
                  <Mail />
                  <Separator orientation="vertical" className="w-[2px] h-5" />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Masukkan Email..."
                    className="w-full bg-transparent outline-none font-semibold"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="font-semibold">
                  Password
                </label>
                <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
                  <KeyRound />
                  <Separator orientation="vertical" className="w-[2px] h-5" />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Masukkan Password..."
                    className="w-full bg-transparent outline-none font-semibold"
                  />
                </div>
              </div>
              <Button className="text-md bg-blue-500 mt-5">Login</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
