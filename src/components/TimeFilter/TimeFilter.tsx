'use client';

import dateStore from '@/store/dateStore';
import ButtonTabs from '../UI/ButtonTabs/ButtonTabs';
import TimePeriod from './elements/TimePeriod/TimePeriod';
import styles from './TimeFilter.module.css';

import { useCallback, type FC, type MouseEvent } from 'react';
import type { IFilters } from '@/store/dateStore';
import type { OnChangeTabType } from '../UI/ButtonTabs/ButtonTabs';

interface TimeFilterProps {
  className?: string;
}

const TimeFilter: FC<TimeFilterProps> = (props) => {
  const { className, ...restProps } = props;

  const { filtersByPeriod } = dateStore();
  const setSelectPeriod = dateStore((state) => state.setSelectPeriod);

  const handleChangeTab = useCallback(
    (e: MouseEvent, tab: IFilters) => {
      setSelectPeriod(tab.id);
    },
    [setSelectPeriod],
  );

  return (
    <div>
      <ButtonTabs
        className={styles.buttonTabs}
        tabs={filtersByPeriod}
        onChangeTab={handleChangeTab as OnChangeTabType}
      />
      <TimePeriod className={styles.timePeriod} />
    </div>
  );
};

export default TimeFilter;
