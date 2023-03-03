import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={quickSand.className}>
      <Component {...pageProps} />
    </main>
  );
}
