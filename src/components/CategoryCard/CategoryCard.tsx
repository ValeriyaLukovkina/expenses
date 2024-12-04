'use client';

import cn from 'classnames';

import { icons } from '@/data/expenses';
import styles from './CategoryCard.module.css';

import { useCallback, type CSSProperties, type FC } from 'react';

interface CategoryCardProps {
  className?: string;
  iconId: string;
  color?: string;
  name?: string;
  active?: boolean;
  view?: 'default' | 'filled';
}

const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { iconId, color, name, active, view = 'default', className, ...restProps } = props;

  const IconComponent = icons[iconId]?.Component;

  return (
    <div
      style={{ '--color': color } as CSSProperties}
      className={cn(
        styles.category,
        {
          [styles.active]: active,
          [styles.viewFilled]: view === 'filled',
          [styles.viewDefault]: view === 'default',
        },
        className,
      )}
      {...restProps}
    >
      <div className={styles.iconWrapper}>
        <IconComponent className={styles.icon} />
      </div>
      {name && <div className={styles.name}>{name}</div>}
    </div>
  );
};

export default CategoryCard;
