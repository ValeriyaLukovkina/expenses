'use client';

import cn from 'classnames';

import { icons } from '@/data/expenses';
import styles from './CategoryCard.module.css';

import { useCallback, type CSSProperties, type FC } from 'react';
import IconFolder from '@/icons/IconFolder/IconFolder';

interface CategoryCardProps {
  className?: string;
  iconId: string;
  color?: string;
  name?: string;
  active?: boolean;
  variant?: 'default' | 'filled';
  size?: 'l' | 'm' | 's';
}

const CategoryCard: FC<CategoryCardProps> = (props) => {
  const {
    iconId,
    color,
    name,
    active,
    variant = 'default',
    size = 'm',
    className,
    ...restProps
  } = props;

  const IconComponent = icons[iconId]?.Component;

  return (
    <div
      style={{ '--color': color } as CSSProperties}
      className={cn(
        styles.category,
        {
          [styles.active]: active,
          [styles.variantDefault]: variant === 'default',
          [styles.variantFilled]: variant === 'filled',
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
        },
        className,
      )}
      {...restProps}
    >
      <div className={styles.iconWrapper}>
        {IconComponent ? (
          <IconComponent className={styles.icon} />
        ) : (
          <IconFolder className={styles.icon} />
        )}
      </div>
      {name && <div className={styles.name}>{name}</div>}
    </div>
  );
};

export default CategoryCard;
