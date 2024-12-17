import { create } from 'zustand';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import type { Dayjs } from 'dayjs';

dayjs.extend(isoWeek);

export interface IFilters {
  id: 'day' | 'week' | 'month' | 'year';
  label: string;
}

export type FilterId = IFilters['id'];

interface DateStoreState {
  selectPeriod: FilterId;
  selectDate: Dayjs;
  filtersByPeriod: IFilters[];
  startDate: Dayjs;
  endDate: Dayjs;
  isLastPeriod: boolean;

  updateDateRange: () => void;
  setSelectPeriod: (period: FilterId) => void;
  goToPreviousDate: () => void;
  goToNextDate: () => void;
}

const dateStore = create<DateStoreState>((set, get) => ({
  selectPeriod: 'day',
  selectDate: dayjs(),
  filtersByPeriod: [
    {
      id: 'day',
      label: 'Day',
    },
    {
      id: 'week',
      label: 'Week',
    },
    {
      id: 'month',
      label: 'Month',
    },
    {
      id: 'year',
      label: 'Year',
    },
  ],
  startDate: dayjs().startOf('day'),
  endDate: dayjs().endOf('day'),

  get isLastPeriod() {
    const { selectPeriod, selectDate } = get();
    const today = dayjs();
    switch (selectPeriod) {
      case 'day':
        return selectDate.isSame(today, 'day');
      case 'week':
        return selectDate.isSame(today, 'isoWeek');
      case 'month':
        return selectDate.isSame(today, 'month');
      case 'year':
        return selectDate.isSame(today, 'year');
      default:
        return false;
    }
  },

  updateDateRange: () => {
    const { selectDate, selectPeriod } = get();
    let startDate: Dayjs;
    let endDate: Dayjs;

    switch (selectPeriod) {
      case 'day':
        startDate = selectDate.startOf('day');
        endDate = selectDate.endOf('day');
        break;
      case 'week':
        startDate = selectDate.startOf('isoWeek');
        endDate = selectDate.endOf('isoWeek');
        break;
      case 'month':
        startDate = selectDate.startOf('month');
        endDate = selectDate.endOf('month');
        break;
      case 'year':
        startDate = selectDate.startOf('year');
        endDate = selectDate.endOf('year');
        break;
      default:
        startDate = selectDate.startOf('day');
        endDate = selectDate.endOf('day');
    }

    set({ startDate, endDate });
  },
  setSelectPeriod: (period: FilterId) => {
    set({ selectPeriod: period });
    get().updateDateRange();
  },
  goToPreviousDate: () => {
    set(({ selectPeriod, selectDate }) => {
      return { selectDate: selectDate.subtract(1, selectPeriod) };
    });
    get().updateDateRange();
  },
  goToNextDate: () => {
    set(({ selectPeriod, selectDate }) => {
      return { selectDate: selectDate.add(1, selectPeriod) };
    });
    get().updateDateRange();
  },
}));

export default dateStore;
