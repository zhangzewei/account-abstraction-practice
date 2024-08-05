import { SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

export default function useDynamicSigner() {
    const [signer, setSigner] = useState<SmartAccountSigner | null>(null);
    const { primaryWallet } = useDynamicContext();
    const genSigner = async () => {
        try {
            const dynamicProvider = await primaryWallet?.connector?.getWalletClient();
            if (dynamicProvider) {
                const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
                    dynamicProvider as any,
                    "dynamic" // signer type
                );
                setSigner(dynamicSigner);
            }
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        if (primaryWallet) {
            genSigner();
        }
    }, [primaryWallet]);
    return signer;
}