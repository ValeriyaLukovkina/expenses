"use client"

import cn from "classnames";
import styles from './CategoryCard.module.css';

import type { CSSProperties, FC } from "react";
import { ICategory } from "@/types/Expenses";
import { icons } from "@/data/expenses";

interface CategoryCardProps {
  className?: string;
  category: ICategory;
  active?: boolean;
}

const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { category, active, className, ...restProps }  = props;

  const IconComponent = icons[category.iconId]?.Component; 

  return (
    <div style={{'--color': category.color} as CSSProperties} className={cn(styles.category,{[styles.active]: true}, className)} {...restProps}>
      <div className={styles.iconWrapper}>
        <IconComponent className={styles.icon}/>
      </div>
      <div className={styles.name}>{category.name}</div>
    </div>
  );
}

export default CategoryCard