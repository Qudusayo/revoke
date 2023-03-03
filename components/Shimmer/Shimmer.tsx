import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Shimmer.module.scss";

export default function Shimmer() {
  return (
    <div className={styles.Shimmer}>
      <SkeletonTheme baseColor="#e4e2e3" highlightColor="#cfcfcf">
        <div className={styles.ShimmerHeader}>
          <Skeleton circle={true} width={32} height={32} />
          <div
            style={{
              flex: 1,
            }}
          >
            <Skeleton height={20} width={"70%"} />
          </div>
        </div>
        <div>
          <Skeleton height={12} width={"70%"} />
          <Skeleton height={20} />
        </div>
        <Skeleton height={35} className={styles.ShimmerButton} />
      </SkeletonTheme>
    </div>
  );
}
