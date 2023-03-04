import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Revoke Approvals",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={quickSand.className}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}
