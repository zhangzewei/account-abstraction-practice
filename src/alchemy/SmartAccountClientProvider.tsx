'use client'

import useDynamicSigner from "@/hooks/useDynamicSigner";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { SmartAccountClient, SmartAccountSigner, sepolia } from "@alchemy/aa-core";
import { createContext, useEffect, useState } from "react";
import { Address } from "viem";
export const SmartAccountClientContext = createContext<{
    smartAccountClient: SmartAccountClient | null,
    AAadress: Address,
    AAbalance: string,
    loadingBalance: boolean;
    loadingAddress: boolean;
    loadAABalance: () => void
}>({
    smartAccountClient: null,
    AAadress: '' as Address,
    AAbalance: '',
    loadingBalance: false,
    loadingAddress: false,
    loadAABalance: () => { }
});

export default function SmartAccountClientProvider({ children }: any) {
    const [AAadress, setAAadress] = useState<Address>('' as Address);
    const [AAbalance, setAAbalance] = useState('');
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [smartAccountClient, setSmartAccountClient] = useState<SmartAccountClient | null>(null)
    const dynamicSigner = useDynamicSigner();
    const getBalance = async (client: SmartAccountClient, address: Address) => {
        try {
            setLoadingBalance(true)
            const balance = await client?.getBalance({
                address
            })
            setAAbalance(balance.toString())
        } catch (err) {
            throw err;
        } finally {
            setLoadingBalance(false)
        }
    }
    const createSmartAccountClient = async (signer: SmartAccountSigner<any>) => {
        try {
            setLoadingAddress(true)
            const smartAcClient = await createModularAccountAlchemyClient({
                apiKey: process.env.NEXT_PUBLIC_alchemy_apikey,
                chain: sepolia,
                signer,
            });
            setSmartAccountClient(smartAcClient)
            setAAadress(smartAcClient.getAddress())
            await getBalance(smartAcClient, smartAcClient.getAddress())
        } catch (err) {
            throw err;
        } finally {
            setLoadingAddress(false)
        }
    }
    const loadAABalance = async () => {
        try {
            if (smartAccountClient) {
                await getBalance(smartAccountClient, AAadress as Address)
            }
        } catch (err) {
            throw err;
        }
    }
    useEffect(() => {
        if (dynamicSigner) {
            createSmartAccountClient(dynamicSigner)
        }
    }, [dynamicSigner]);
    return <SmartAccountClientContext.Provider
        value={{
            smartAccountClient,
            AAadress,
            AAbalance,
            loadingBalance,
            loadingAddress,
            loadAABalance
        }}
    >
        {children}
    </SmartAccountClientContext.Provider>
}