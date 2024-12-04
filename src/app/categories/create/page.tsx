'use client';

import HeaderSimple from '@/components/HeaderSimple/HeaderSimple';
import CategoryForm from '../_elements/CategoryForm/CategoryForm';

import styles from './page.module.css';

const CreateCategories = () => {
  return (
    <div>
      <HeaderSimple name='Create Category' />
      <main className={styles.main}>
        <CategoryForm action='create' />
      </main>
    </div>
  );
};

export default CreateCategories;
