import { type AppType } from "next/app";
import { ClerkProvider } from '@clerk/nextjs';
import Head from "next/head";

import { api } from "~/utils/api";
import "~/styles/fonts.css";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Pick-my-Meal 🤖</title>
        <meta name="description" content="Pick my meal app, built with T3 stack and leveraging ChatGPT." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
