import styles from './style.less';
export default function Recommend(props) {
  const { data, item, keys, src } = props;
  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <>
          <div className={styles.title}>
            <span>
              <img src={src} alt="Horse Racing Logo" />
            </span>
            <span>{data[keys['title']]}</span>
          </div>
          <div className={styles.container}>{item(data[keys['information']])}</div>
        </>
      )}
    </>
  );
}
