'use client';

import { FC, ReactNode, useState } from 'react';
import styles from './Header.module.css';
import ModalMenu from '../Modals/ModalMenu/ModalMenu';

interface HeaderProps {
  name: string;
  additional: ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
  const { name, additional, ...restProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => setIsOpen(!isOpen);

  const handleCloseMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.header} {...restProps}>
      <button className={styles.menu} onClick={handleOpenMenu}></button>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.additional}>{additional}</div>

      {isOpen && <ModalMenu onClose={handleCloseMenu} />}
    </div>
  );
};

export default Header;
