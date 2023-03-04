import styles from "./Card.module.scss";
import {
  switchNetwork,
  readContract,
  getAccount,
  writeContract,
} from "@wagmi/core";
import { useNetwork } from "wagmi";

import contractAbi from "@/abi.json";
import Loader from "../Loader/Loader";
import { useState } from "react";

export default function Card({
  logo,
  name,
  spenderName,
  spenderAddress,
  assetAddress,
  isConnectedOwner,
  chainId,
}: Partial<{
  logo: string;
  name: string;
  spenderName: string;
  spenderAddress: string;
  assetAddress: string;
  isConnectedOwner: boolean;
  chainId: number | null;
}>) {
  const { chain: network } = useNetwork();
  const account = getAccount();
  const [revokingApproval, setRevokingApproval] = useState(false);

  const revokeApproval = async () => {
    setRevokingApproval(true);
    try {
      const contractCall = {
        address: assetAddress as `0x${string}`,
        abi: contractAbi,
        chainId: chainId as number,
      };

      const approval = await readContract({
        ...contractCall,
        functionName: "allowance",
        args: [account.address, spenderAddress],
      });

      if (chainId !== network?.id && chainId !== null) {
        await switchNetwork({
          chainId: chainId as number,
        });
      }

      const sendTransaction = await writeContract({
        mode: "recklesslyUnprepared",
        ...contractCall,
        functionName: "decreaseAllowance",
        args: [spenderAddress, approval],
      });

      sendTransaction
        .wait()
        .then((receipt) => {
          setRevokingApproval(false);
        })
        .finally(() => {
          setRevokingApproval(false);
        });
    } catch (error) {
      console.log(error);
      setRevokingApproval(false);
    }
  };

  return (
    <div className={styles.Card}>
      <div>
        <img src={logo} width={32} height={32} alt="placeholder" />
        <h3>{name}</h3>
      </div>
      <div>
        <span>Spender: {spenderName}</span>
        <h3>{spenderAddress}</h3>
      </div>
      {/* <span className={styles.link}>Show More...</span> */}
      <button
        disabled={!isConnectedOwner || revokingApproval}
        onClick={revokeApproval}
      >
        {revokingApproval ? <Loader /> : "Revoke"}
      </button>
    </div>
  );
}
