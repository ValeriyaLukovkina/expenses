import { FC } from 'react';
import cn from 'classnames';

import dateStore from '@/store/dateStore';
import styles from './TimePeriod.module.css';

interface TimePeriodProps {
  className?: string;
}

const TimePeriod: FC<TimePeriodProps> = (props) => {
  const { className, ...restProps } = props;

  const { selectPeriod, selectDate } = dateStore();
  const goToPrevious = dateStore((state) => state.goToPreviousDate);
  const goToNext = dateStore((state) => state.goToNextDate);

  const getFormattedPeriod = () => {
    switch (selectPeriod) {
      case 'day':
        return selectDate.format('MMMM DD');

      case 'week': {
        const startOfWeek = selectDate.startOf('isoWeek');
        const endOfWeek = selectDate.endOf('isoWeek');
        return `${startOfWeek.format('MMM DD')} - ${endOfWeek.format('MMM DD')}`;
      }

      case 'month':
        return selectDate.format('MMM YYYY');

      case 'year':
        return selectDate.format('YYYY');

      default:
        return '';
    }
  };

  return (
    <div className={cn(styles.timePeriod, className)}>
      <span className={cn(styles.arrow, styles.arrowLeft)} onClick={goToPrevious}></span>
      <div className={styles.text}>{getFormattedPeriod()}</div>
      <span className={cn(styles.arrow, styles.arrowRight)} onClick={goToNext}></span>
    </div>
  );
};

export default TimePeriod;
