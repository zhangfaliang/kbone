import styles from './style.less';
export default function RacingTable(props) {
  const { data, item, keys } = props;
  return (
    <>
      {data.list.length > 0 && (
        <div className={styles.container}>
          <div>{data[keys['title']]}</div>
          {item(data[keys['information']])}
        </div>
      )}
    </>
  );
}
