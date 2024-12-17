'use client';

import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { icons } from '@/data/expenses';
import categoriesStore from '@/store/categoriesStore';
import Input from '@/components/UI/Input/Input';
import Calendar from '@/components/Calendar/Calendar';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import Button from '@/components/UI/Button/Button';
import styles from './ExpensesForm.module.css';

import type { FC } from 'react';
import type { ICategory } from '@/types/Expenses';
import type { Dayjs } from 'dayjs';
import IconCalendar from '@/icons/IconCalendar/IconCalendar';
import ModalCalendar from '@/components/Modals/ModalCalendar/ModalCalendar';

// export type CategoryFormType = z.infer<typeof CategorySchema>;

interface ExpensesFormProps {
  categoryName?: string;
  iconId?: string;
  color?: string;
  id?: string;
  action: 'create' | 'edit';
}

const ExpensesForm: FC<ExpensesFormProps> = (props) => {
  const { categoryName, iconId, color, id, action, ...restProps } = props;
  const router = useRouter();
  const { categories } = categoriesStore();

  const [showCalendar, setShowCalendar] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [selectCategories, setSelectCategories] = useState<string>(iconId || '');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [errors, setErrors] = useState<Partial<Record<keyof ICategory, string>> | null>(null);
  const [isPending, startTransition] = useTransition();

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;

    setAmount(Number(value));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectIcon = (id: string) => {
    if (!isPending) {
      setSelectCategories(id);
    }
  };

  const handleOpenCalendar = () => setShowCalendar(true);

  const handleCloseCalendar = () => setShowCalendar(false);

  const setToday = () => {
    setSelectedDate(today);
  };

  const setYesterday = () => {
    setSelectedDate(yesterday);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    startTransition(async () => {
      // if (action === 'create') {
      //   createCategory(fullFormData).then((res) => {
      //     if (res?.errors) {
      //       setErrors((prev) => ({ ...prev, ...res?.errors }));
      //     } else {
      //       router.push('/categories');
      //     }
      //   });
      // }
      // if (action === 'edit' && id) {
      //   editCategory(fullFormData, id).then((res) => {
      //     if (res?.errors) {
      //       setErrors((prev) => ({ ...prev, ...res?.errors }));
      //     } else {
      //       router.push('/categories');
      //     }
      //   });
      // }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} {...restProps}>
        <div className={styles.amount}>
          <Input
            id='amount'
            name='amount'
            onChange={handleChange}
            disabled={isPending}
            value={amount}
            variant='underlined'
            size='m'
            className={styles.input}
          />
          <div>USD</div>
        </div>
        <div className={styles.categoriesWrapper}>
          <div className={styles.title}>Categories</div>
          <div className={styles.categories}>
            {categories.map((category) => (
              <div onClick={() => handleSelectIcon(category.id)} key={category.id}>
                <CategoryCard
                  iconId={category.iconId}
                  active={category.id === selectCategories}
                  color={category.color}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.datesWrapper}>
          <div className={styles.title}>Date</div>
          <div className={styles.datesContainer}>
            <div className={styles.dates}>
              <Button onClick={setToday} radius='s' className={styles.date}>
                <div className={styles.number}>{today.format('DD.MM')}</div>
                <div className={styles.text}>Сегодня</div>
              </Button>
              <Button onClick={setYesterday} radius='s' className={styles.date}>
                <div className={styles.number}>{yesterday.format('DD.MM')}</div>
                <div className={styles.text}>Вчера</div>
              </Button>
              <Button onClick={setYesterday} radius='s' className={styles.date}>
                <div className={styles.number}>{selectedDate.format('DD.MM')}</div>
                <div className={styles.text}>Seleted</div>
              </Button>
            </div>
            <Button className={styles.openCalendar} radius='s' onClick={handleOpenCalendar}>
              <IconCalendar className={styles.icon}/>
            </Button>
          </div>
        </div>
        <Button variant='reversed' size='s' radius='round' type='submit' className={styles.button}>
          {action === 'create' ? 'Create' : 'Save'}
        </Button>
      </form>
      {showCalendar && (
        <ModalCalendar
          onClose={handleCloseCalendar}
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
        />
      )}
    </>
  );
};

export default ExpensesForm;
