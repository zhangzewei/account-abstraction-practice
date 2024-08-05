'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { PropsWithChildren } from "react"; import {
    DynamicContextProvider,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { wagmiConfig } from "../config";
const queryClient = new QueryClient()

export default function WalletProvider({ children }: PropsWithChildren) {
    return <DynamicContextProvider
        settings={{
            environmentId: process.env.NEXT_PUBLIC_dynamic_env as string,
            walletConnectors: [EthereumWalletConnectors],
        }}
    >
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <DynamicWagmiConnector>
                    {children}
                </DynamicWagmiConnector>
            </QueryClientProvider>
        </WagmiProvider>
    </DynamicContextProvider>
}