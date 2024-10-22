import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loginFormSchema } from "@/lib/validation";
import { login } from "@/network/NewsApi";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState<{
    email?: string | undefined;
    password?: string | undefined;
  } | null>(null);
  const [error, setError] = useState<{
    errorTitle: string;
    errorDesc: string[];
  } | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = loginFormSchema.safeParse({
      email: loginData?.email,
      password: loginData?.password,
    });

    if (!validate.success) {
      const errorDesc = validate.error.issues.map((issue) => issue.message);

      return setError({
        errorTitle: "Error Validation",
        errorDesc,
      });
    }

    const isAuthenticatedUser = await login(
      loginData?.email,
      loginData?.password
    );

    if (isAuthenticatedUser) {
      return navigate("/dashboard");
    }

    return setError({
      errorTitle: "User Not Found",
      errorDesc: ["Email or password incorrect"],
    });
  };

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
                <Link to={"/"}>Back to website</Link>
              </p>
              <ArrowRight size={12} className="ml-1 text-white" />
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-10 pr-10 pt-5">
          <div className="mb-5">
            <h2 className="text-blue-500 text-center text-5xl font-bold mb-1">
              Welcome
            </h2>
            <p className="text-blue-500 text-center text-sm font-normal">
              Login with Email
            </p>
          </div>
          {error && (
            <div className="bg-red-700 rounded mt-2 p-2 text-white">
              <p className="font-semibold">{error.errorTitle}</p>
              <ol className="list-disc text-md ml-4">
                {error.errorDesc.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ol>
            </div>
          )}
          <div className="mt-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="font-semibold">
                  Email
                </label>
                <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
                  <Mail />
                  <Separator orientation="vertical" className="w-[2px] h-5" />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email..."
                    className="w-full bg-transparent outline-none font-semibold"
                    value={loginData?.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
                  <KeyRound />
                  <Separator orientation="vertical" className="w-[2px] h-5" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Masukkan Password..."
                    className="w-full bg-transparent outline-none font-semibold"
                    value={loginData?.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button className="text-md bg-blue-500 mt-5" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
