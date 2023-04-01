import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { SignOutButton, SignInButton, useUser } from "@clerk/nextjs";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // const { data } = api.meals.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Pick-my-Meal 🤖</title>
        <meta name="description" content="Pick my meal app, built with T3 stack and leveraging ChatGPT." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {!!user.isSignedIn && <div className="text-white"><SignOutButton /></div>}
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
            {!user.isSignedIn && <SignInButton />}
          </h1>
          {!!user.isSignedIn && (
              <>
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Hello, friend</h1>
                <h3 className="text-xl font-bold tracking-tight text-gray-200">
                  We are here to help you pick your next meal.
                </h3>
              </>
            )}
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Sign Up →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
            >
              <h3 className="text-2xl font-bold">Log in →</h3>
            </Link>
          </div> */}
          {/* <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p> */}
        </div>
      </main>
    </>
  );
};

export default Home;
