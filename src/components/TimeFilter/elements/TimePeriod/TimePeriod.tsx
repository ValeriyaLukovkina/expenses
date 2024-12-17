import { FC } from 'react';
import cn from 'classnames';

import dateStore from '@/store/dateStore';
import IconArrow from '@/icons/IconArrow/IconArrow';
import styles from './TimePeriod.module.css';

interface TimePeriodProps {
  className?: string;
}

const TimePeriod: FC<TimePeriodProps> = (props) => {
  const { className, ...restProps } = props;

  const { selectPeriod, selectDate, isLastPeriod } = dateStore();
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
    <div className={cn(styles.timePeriod, className)} {...restProps}>
      <IconArrow onClick={goToPrevious} className={cn(styles.arrow, styles.arrowLeft)} />
      <div className={styles.text}>{getFormattedPeriod()}</div>
      <IconArrow
        onClick={goToNext}
        className={cn(styles.arrow, styles.arrowRight, { [styles.isLastPeriod]: isLastPeriod })}
      />
    </div>
  );
};

export default TimePeriod;
