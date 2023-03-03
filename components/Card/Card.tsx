import Image from "next/image";
import styles from "./Card.module.scss";

export default function Card({
  logo,
  name,
  spenderName,
  spenderAddress,
  transactionHash,
}: {
  logo: string;
  name: string;
  spenderName: string;
  spenderAddress: string;
  transactionHash: string;
}) {
  return (
    <div className={styles.Card}>
      <div>
        <Image src={logo} width={32} height={32} alt="placeholder" />
        <h3>{name}</h3>
      </div>
      <div>
        <span>Spender: {spenderName}</span>
        <h3>{spenderAddress}</h3>
      </div>
      {/* <span className={styles.link}>Show More...</span> */}
      <button>Revoke</button>
    </div>
  );
}
