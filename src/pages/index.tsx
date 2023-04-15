/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";
import { SignOutButton, SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { getNextMealQuery } from "~/utils/chatQuery";
import UserSelectionGroup, { type SelectionsObject } from "~/components/UserSelections";
import ChatWindowComponent from "~/components/ChatWindow";
import Footer from "~/components/Footer";
import LoadingSpinner from "~/components/LoadingSpinner";

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  const [chatLog, setChatLog] = useState<{
    type: string;
    text: string;
  }[]>([{ type: "bot", text: "Hi there! I'm your personal nutritionist. Let's get started!" }]);
  const [loading, setLoading] = useState(false);
  const [showConvo, setShowConvo] = useState(false);
  const [selections, setSelections] = useState<SelectionsObject>({
    age: '',
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    gender: '',
    lifeType: '',
    objective: '',
  });

  const finalQuery: string = useMemo(() => {
    return getNextMealQuery({
      userParams: {
        age: selections.age,
        height: selections.height,
        heightUnit: selections.heightUnit,
        weight: selections.weight,
        weightUnit: selections.weightUnit,
        objective: selections.objective,
        lifeType: selections.lifeType,
        gender: selections.gender,
      },
    });
  }, [selections]);

  const isValidQuery: boolean = useMemo(() => {
    if (!selections || (selections && Object.keys(selections).length === 0)) return true;
    // check each property of selections object if it has a value or it's empty
    const hasEmptyValue = Object.values(selections).some((value) => value === '');
    return !hasEmptyValue;
  }, [selections]);

  const { refetch } = api.chat.premiumGenerateChat.useQuery({
    query: finalQuery,
  }, {
    enabled: false, // disable for initial render
  });

  const handleSubmit = async () => {
    const allChat = [finalQuery, { type:'user', text: finalQuery }] as {
      type: string;
      text: string;
    }[];
    setLoading(true);
    try {
      const { data } = await refetch();
      setChatLog([...allChat, { type: 'bot', text: data as string }]);
      setShowConvo(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelections = (selections: SelectionsObject) => {
    setSelections(selections);
  };

  return (
    <>
      <Head>
        <title>Pick-my-Meal 🤖</title>
        <meta name="description" content="Pick my meal app, built with T3 stack and leveraging ChatGPT." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showConvo ? (
        <>
          <button
            className="start-over-btn py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            onClick={() => setShowConvo(false)}
          >
            Start over 🗑️
          </button>
          <ChatWindowComponent
            chatLog={chatLog}
            sendNewMessage={(message: string) => console.log(message)}
          />
        </>
      ) : (
        <main className="flex min-h-screen overflow-y-auto flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            {userLoaded ? (
              <>
                {!!isSignedIn && <div className="signout-btn text-white"><SignOutButton /></div>}
                {!isSignedIn && (
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Welcome to Pick-my-Meal</h1>
                    <h2 className="font-medium text-2xl text-blue-600 dark:text-blue-500 hover:underline mt-5">
                      <SignInButton />
                    </h2>
                  </div>
                )}
                {!!isSignedIn && (
                  <>
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Hello, friend</h1>
                    <h3 className="text-xl font-bold tracking-tight text-gray-200">
                      We are here to help you pick your next meal, <br />without you thinking about it
                    </h3>
                    {isSignedIn && (
                      <>
                        <div className="container flex flex-col items-center justify-center gap-8 pb-4">
                          <h3 className="text-xl font-bold tracking-tight text-gray-200">
                            Tell us a little about yourself.
                          </h3>
                          <UserSelectionGroup sendSelections={handleSelections} />
                        </div>
                        {loading ? (
                          <div className="animate-pulse bg-[#2e026d] text-white p-4 rounded-lg shadow-lg">
                            Loading...
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSubmit()}
                            className="bg-[#2e026d] text-white p-4 rounded-lg shadow-lg hover:bg-[#15162c] mb-4"
                            disabled={!isValidQuery}
                          >
                            Pick my meal
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Home;
