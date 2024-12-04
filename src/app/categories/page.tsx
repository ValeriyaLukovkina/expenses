'use client';

import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Link from 'next/link';

import categoriesStore from '@/store/categoriesStore';
import IconPlus from '@/icons/IconPlus';
import DraggableCategoryCard from './_elements/DraggableCategoryCard/DraggableCategoryCard';
import styles from './page.module.css';
import Header from '@/components/Header/Header';

const Categories = () => {
  const { categories } = categoriesStore();

  const setCategories = categoriesStore((state) => state.setCategories);

  const moveCategory = useCallback((fromIndex: number, toIndex: number) => {
    const updatedCategories = [...categories];
    const [movedCategory] = updatedCategories.splice(fromIndex, 1);
    updatedCategories.splice(toIndex, 0, movedCategory);
    setCategories(updatedCategories);
  }, []);

  const saveCategories = async () => {
    try {
      await fetch('/api/updateOrder', {
        method: 'POST',
        body: JSON.stringify({ categories }),
      });
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  return (
    <div>
      <Header name='Categories' additional={<div>111</div>} />
      <main>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.container}>
            <h2>Categories</h2>
            <div className={styles.categories}>
              {categories.map((category, index) => (
                <DraggableCategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  moveCategory={moveCategory}
                />
              ))}
              <Link className={styles.addButton} href={'/categories/create'}>
                <IconPlus className={styles.addIcon} />
              </Link>
            </div>
          </div>
        </DndProvider>
      </main>
    </div>
  );
};

export default Categories;
