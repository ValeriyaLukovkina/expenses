import { useState, MouseEvent } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import { deleteCategory } from '@/app/actions/category/deleteCategory';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import styles from './DraggableCategoryCard.module.css';

import type { FC } from 'react';
import type { ICategory } from '@/types/Expenses';
import Button from '@/components/UI/Button/Button';

const ItemType = 'CATEGORY';

interface DraggableCategoryCard {
  className?: string;
  category: ICategory;
  active?: boolean;
  index: number;
  moveCategory?: (item: any, index: number) => void;
}

const DraggableCategoryCard: FC<DraggableCategoryCard> = (props) => {
  const { category, active, className, index, moveCategory, ...restProps } = props;
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCategory(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleClick = () => {
    router.push(`/categories/edit/${category.id}`);
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteCategory(category.id);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    e.target.addEventListener('mouseup', () => clearTimeout(timeout), { once: true });
  };

  return (
    <>
      {isVisible && <div className={styles.overlay} onClick={() => setIsVisible(false)}></div>}
      <div
        ref={(node) => drop(ref(node))}
        className={cn(styles.categoryCard, { [styles.dragging]: isDragging }, className)}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        <CategoryCard iconId={category.iconId} name={category.name} color={category.color} />
        {isVisible && (
          <div className={styles.popup}>
            <Button variant='light' onClick={handleDelete}>Delete</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DraggableCategoryCard;
