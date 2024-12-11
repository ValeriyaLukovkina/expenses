'use client';

import HeaderSimple from '@/components/HeaderSimple/HeaderSimple';
import ExpensesForm from '../_elements/ExpensesForm/ExpensesForm';

import styles from './page.module.css';

const CreateExpenses = () => {
  return (
    <div>
      <HeaderSimple name='Add Expenses' />
      <main className={styles.main}>
        <ExpensesForm action='create' />
      </main>
    </div>
  );
};

export default CreateExpenses;
