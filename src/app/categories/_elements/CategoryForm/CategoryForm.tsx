'use client';

import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';

import { icons } from '@/data/expenses';
import { colors } from '@/data/colors';
import { createCategory } from '@/app/actions/category/createCategory';
import { editCategory } from '@/app/actions/category/editCategory';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import Button from '@/components/UI/Button/Button';
import styles from './CategoryForm.module.css';

import type { FC } from 'react';
import type { CategorySchema } from '@/Schemas';
import type { ICategory } from '@/types/Expenses';
import Input from '@/components/UI/Input/Input';
import userStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

export type CategoryFormType = z.infer<typeof CategorySchema>;

interface CategoryFormProps {
  categoryName?: string;
  limit?: number;
  iconId?: string;
  color?: string;
  id?: string;
  action: 'create' | 'edit';
}

const CategoryForm: FC<CategoryFormProps> = (props) => {
  const { categoryName, limit, iconId, color, id, action, ...restProps } = props;
  const router = useRouter();

  const [formData, setFormData] = useState<{ limit: number; name: string }>({
    limit: limit || 0,
    name: categoryName || '',
  });
  const [selectIcon, setSelectIcon] = useState<string>(iconId || '');
  const [selectColor, setSelectColor] = useState<string>(color || '');

  const [errors, setErrors] = useState<Partial<Record<keyof ICategory, string>> | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'limit') {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'limit' ? Number(value) || 0 : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectIcon = (id: string) => {
    if (!isPending) {
      setSelectIcon(id);
    }
  };

  const handleSelectColor = (color: string) => {
    if (!isPending) {
      setSelectColor(color);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullFormData = {
      ...formData,
      iconId: selectIcon,
      color: selectColor,
    };

    setErrors({});

    startTransition(async () => {
      if (action === 'create') {
        createCategory(fullFormData).then((res) => {
          if (res?.errors) {
            setErrors((prev) => ({ ...prev, ...res?.errors }));
          } else {
            router.push('/categories');
          }
        });
      }

      if (action === 'edit' && id) {
        editCategory(fullFormData, id).then((res) => {
          if (res?.errors) {
            setErrors((prev) => ({ ...prev, ...res?.errors }));
          } else {
            router.push('/categories');
          }
        });
      }
    });
  };

  useEffect(() => {
    setFormData({ limit: limit || 0, name: categoryName || '' });
    setSelectIcon(iconId || '');
    setSelectColor(color || '');
  }, [categoryName, limit, iconId, color]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} {...restProps}>
      <div className={styles.name}>
        <CategoryCard
          iconId={selectIcon}
          active={id === selectIcon}
          color={selectColor ? selectColor : 'lightgray'}
          size='s'
        />
        <Input
          id='name'
          name='name'
          label='Category Name'
          onChange={handleChange}
          disabled={isPending}
          value={formData.name}
          variant='underlined'
          size='l'
          fullWidth
          className={styles.input}
        />
      </div>
      <div className={styles.limitWrapper}>
        <Input
          id='limit'
          name='limit'
          placeholder='Not selected'
          label='Planned outlay'
          onChange={handleChange}
          disabled={isPending}
          value={formData.limit}
          variant='underlined'
          labelPlacement='outside'
          className={styles.inputLimit}
        />
        <div>USD per month</div>
      </div>
      <div className={styles.iconsWrapper}>
        <div className={styles.title}>Icons</div>
        <div className={styles.icons}>
          {Object.keys(icons).map((id) => (
            <div onClick={() => handleSelectIcon(id)} key={id}>
              <CategoryCard
                iconId={id}
                active={id === selectIcon}
                color={selectColor && id === selectIcon ? selectColor : 'lightgray'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.colorsWrapper}>
        <div className={styles.title}>Colors</div>
        <div className={styles.colors}>
          {colors.map((color) => (
            <div
              className={styles.color}
              style={{ backgroundColor: color }}
              onClick={() => handleSelectColor(color)}
              key={color}
            ></div>
          ))}
        </div>
      </div>
      <Button variant='reversed' size='s' radius='round' type='submit' className={styles.button}>
        {action === 'create' ? 'Create' : 'Save'}
      </Button>
    </form>
  );
};

export default CategoryForm;
