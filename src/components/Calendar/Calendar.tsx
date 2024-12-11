import { useState } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';

import IconArrow from '@/icons/IconArrow/IconArrow';
import styles from './Calendar.module.css';

import type { Dayjs } from 'dayjs';

interface CalendarProps {
  initialDate?: Dayjs;
  onChangeDate?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const { initialDate, onChangeDate } = props;
  const [currentDate, setCurrentDate] = useState<Dayjs>(initialDate || dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const year = currentDate.year();
  const month = currentDate.month();

  const daysInMonth = Array.from({ length: currentDate.daysInMonth() }, (_, i) =>
    dayjs(new Date(year, month, i + 1)),
  );

  const firstDayIndex = daysInMonth[0].day();

  const calendarDays = [...Array(firstDayIndex).fill(null), ...daysInMonth];

  const isCurrentMonth = currentDate.isSame(dayjs(), 'month');

  const handleChangeMonth = (direction: number) => {
    const newDate = currentDate.add(direction, 'month');

    if (direction > 0 && isCurrentMonth) return;

    setCurrentDate(newDate);
  };

  const handleChangeDate = (date: Dayjs) => {
    if (!date) return;

    setSelectedDate(date);
    if (onChangeDate) onChangeDate(date);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <IconArrow
          className={cn(styles.icon, styles.iconLeft)}
          onClick={() => handleChangeMonth(-1)}
        />
        <div>{currentDate.format('MMMM YYYY')}</div>
        <IconArrow
          className={cn(styles.icon, { [styles.hidden]: isCurrentMonth })}
          onClick={() => handleChangeMonth(1)}
        />
      </div>

      <div className={styles.calendar}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
        {calendarDays.map((date, index) => (
          <div
            key={index}
            className={cn(styles.day, { [styles.select]: date?.isSame(selectedDate, 'day') })}
            onClick={() => handleChangeDate(date)}
          >
            {date ? date.date() : ''}
          </div>
        ))}
      </div>

      {/* {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          Selected date: {selectedDate.format('DD MMMM YYYY')}
        </div>
      )} */}
    </div>
  );
};

export default Calendar;
