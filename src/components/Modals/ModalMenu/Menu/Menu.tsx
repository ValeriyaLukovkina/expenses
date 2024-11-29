import Link from 'next/link';
import styles from './Menu.module.css';

import type { FC } from 'react';

interface MenuProps {
  title?: string;
}

const menuData = [
  { id: 'home', name: 'Home', link: '/' },
  { id: 'categories', name: 'Categories', link: '/categories' },
  { id: 'regularPayments', name: 'Regular payments', link: '/regular-payments' },
  { id: 'settings', name: 'Settings', link: '/settings' },
];

const Menu: FC<MenuProps> = (props) => {
  const { title } = props;

  return (
    <div className={styles.menu}>
      {menuData.map((item) => {
        return (
          <Link key={item.id} href={item.link} className={styles.item}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
