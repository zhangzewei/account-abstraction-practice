import { SmartAccountClientContext } from "@/alchemy/SmartAccountClientProvider";
import { Card, CardBody, CardFooter, Typography, Button, Input, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { ChangeEventHandler, useContext, useMemo, useState } from "react";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";

export default function AbstractAcount() {
    const {
        AAadress,
        AAbalance,
        loadingBalance,
        loadingAddress,
        loadAABalance
    } = useContext(SmartAccountClientContext);
    const [value, setValue] = useState('');
    const { sendTransaction, isPending, isError } = useSendTransaction()
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = e.target.value;
        setValue(val)
    }
    const isValid = useMemo(() => {
        if (!value) return false;
        if (isNaN(Number(value))) return false;
        return true;
    }, [value])

    const handleCharge = () => {
        chargeAA()
    }

    const chargeAA = async () => {
        sendTransaction({
            to: AAadress,
            value: parseEther(value)
        }, {
            onSuccess: () => {
                loadAABalance();
            },
        });
    }
    return <Card className="flex flex-col gap-2 mt-4">
        <CardBody>
            <Typography variant="h5" color="blue-gray">
                Smart Account Address
            </Typography>
            <Typography className="my-2">
                {loadingAddress ? <Spinner /> : <Link
                    className="hover:text-capstackBlue"
                    target="_blank"
                    href={`https://sepolia.etherscan.io/address/${AAadress}`}
                >{AAadress}</Link>}
            </Typography>
            <Typography variant="h5" color="blue-gray">
                Smart Account Balance
            </Typography>
            <Typography className="my-2">
                {loadingBalance ? <Spinner /> : `${Number(AAbalance) / 1e18} ETH`}
            </Typography>
        </CardBody>
        <CardFooter>
            <div className="mb-4">
                <Input
                    value={value}
                    type="text"
                    label="Charge ETH to AA"
                    crossOrigin={undefined}
                    onChange={handleChange}
                    icon={<div className="absolute">ETH</div>}
                />
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                >
                    Charge ETH to Abstract Acount to do transaction.
                </Typography>
            </div>
            <Button
                disabled={!isValid}
                onClick={handleCharge}
            >Charge</Button>
        </CardFooter>
    </Card>
}