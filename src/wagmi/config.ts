import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
export const wagmiConfig = createConfig({
    chains: [sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
        [sepolia.id]: http(),
    },
});
