'use client';

import dateStore from '@/store/dateStore';
import ButtonTabs from '../UI/ButtonTabs/ButtonTabs';
import TimePeriod from './elements/TimePeriod/TimePeriod';
import ExpenseChart from './elements/ExpenseChart/ExpenseChart';
import styles from './ExpenseSummary.module.css';

import { useCallback, type FC, type MouseEvent } from 'react';
import type { IFilters } from '@/store/dateStore';
import type { OnChangeTabType } from '../UI/ButtonTabs/ButtonTabs';
import Button from '../UI/Button/Button';
import IconPlus from '@/icons/IconPlus';
import Link from 'next/link';

interface ExpenseSummaryProps {
  className?: string;
}

const ExpenseSummary: FC<ExpenseSummaryProps> = (props) => {
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
    <div className={styles.wrapper} {...restProps}>
      <ButtonTabs
        className={styles.buttonTabs}
        tabs={filtersByPeriod}
        onChangeTab={handleChangeTab as OnChangeTabType}
      />
      <TimePeriod className={styles.timePeriod} />
      <ExpenseChart className={styles.expenseChart} />
      <Link href={'/expenses/create'} className={styles.add}>
        <IconPlus className={styles.plus} />
      </Link>
    </div>
  );
};

export default ExpenseSummary;
