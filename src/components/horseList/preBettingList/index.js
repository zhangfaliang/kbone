import styles from './style.less';
export default function PreBettingList(props) {
  const { data } = props;
  return (
    <>
      {data && data.length > 0 && (
        <div className={styles.preBettingList}>
          <div className={styles.title}>
            <span>International</span>
            <span />
          </div>
          <>
            {data.map(v => (
              <div key={v.toString()} className={styles.item}>
                <span>Watch Irish Racing On Racing TV Chase</span>
                <span />
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
}
