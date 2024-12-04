'use client';
import { useMemo, use } from 'react';

import categoriesStore from '@/store/categoriesStore';
import HeaderSimple from '@/components/HeaderSimple/HeaderSimple';
import CategoryForm from '../../_elements/CategoryForm/CategoryForm';

import styles from './page.module.css';

import type { FC } from 'react';

interface EditCategoriesProps {
  params: Promise<{ id: string }>
}

const EditCategories: FC<EditCategoriesProps> = ({ params }) => {
  const { id } = use(params);
  const { categories } = categoriesStore();

  const category = useMemo(() => {
    return categories.find((category) => category.id === id);
  }, [categories]);

  return (
    <div>
      <HeaderSimple name='Edit Category' />
      <main className={styles.main}>
        <CategoryForm
          action='edit'
          categoryName={category?.name}
          limit={category?.limit}
          iconId={category?.iconId}
          color={category?.color}
          id={category?.id}
        />
      </main>
    </div>
  );
};

export default EditCategories;
