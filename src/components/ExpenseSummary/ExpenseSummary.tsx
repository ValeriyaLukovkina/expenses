'use client';

import dateStore from '@/store/dateStore';
import ButtonTabs from '../UI/ButtonTabs/ButtonTabs';
import TimePeriod from './elements/TimePeriod/TimePeriod';
import ExpenseChart from './elements/ExpenseChart/ExpenseChart';
import styles from './ExpenseSummary.module.css';

import type { FC, MouseEvent } from 'react';
import type { IFilters } from '@/store/dateStore';
import type { OnChangeTabType } from '../UI/ButtonTabs/ButtonTabs';

interface ExpenseSummaryProps {
  className?: string;
}

const ExpenseSummary: FC<ExpenseSummaryProps> = (props) => {
  const { className, ...restProps } = props;

  const { filtersByPeriod } = dateStore();
  const setSelectPeriod = dateStore((state) => state.setSelectPeriod);

  const handleChangeTab = (e: MouseEvent, tab: IFilters) => {
    setSelectPeriod(tab.id);
  };

  return (
    <div className={styles.wrapper} {...restProps}>
      <ButtonTabs
        className={styles.buttonTabs}
        tabs={filtersByPeriod}
        onChangeTab={handleChangeTab as OnChangeTabType}
      />
      <TimePeriod className={styles.timePeriod} />
      <ExpenseChart className={styles.expenseChart} />
    </div>
  );
};

export default ExpenseSummary;
