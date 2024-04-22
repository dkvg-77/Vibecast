import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google'
import toast, { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="812220515741-bkjhshkd6rmsesj2mg5t7bs4f3af33pu.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster />
        <ReactQueryDevtools/>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>

}
