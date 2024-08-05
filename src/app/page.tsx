'use client';

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import AbstractAcount from "./components/AbstractAcount";
import { useAccount } from "wagmi";
import { Spinner } from "@material-tailwind/react";

export default function Home() {
	const { isConnected, isConnecting, isReconnecting } = useAccount();
	if (isConnecting || isReconnecting) return <main className="w-screen h-screen flex items-center justify-center">
		<Spinner />
	</main>
	return (
		<main className="w-screen h-screen flex items-center justify-center">
			<div>
				<DynamicWidget variant="modal" />
				{
					isConnected && <AbstractAcount />
				}
			</div>
		</main>
	);
}
