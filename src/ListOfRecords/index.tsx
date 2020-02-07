import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import styles from './styles.css';

const List = () => {
  const listOfRecords = useSelector((state: AppState) => state.GameData.listOfRecords);
  const topRecord = useSelector((state: AppState) => state.GameData.topRecord);
  const topHeight = useSelector((state: AppState) => state.GameData.topHeightStack);

  return (
    <div className={styles.wrap}>
      <div className={styles['flex-block']}>
        <div className={styles.result}>
          <p>Best result</p>
          <p className={styles['result-stats']}>
            Count: <span>{topRecord}</span> Height stack: <span>{topHeight}</span>
          </p>
        </div>
        {listOfRecords.length > 0 && (
          <div className={styles.container}>
            <ul className={styles.list}>
              {listOfRecords
                .slice(0)
                .reverse()
                .map(record => (
                  <li key={record.id}>
                    {record.time}
                    <div>
                      <span>count: {record.count}</span>
                      <span>height stack: {record.heightStack}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
