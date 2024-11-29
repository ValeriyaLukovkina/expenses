import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalMenu.module.css';

import type { FC } from 'react';
import userStore from '@/store/userStore';
import Menu from './Menu/Menu';

interface ModalMenuProps {
  onClose: () => void;
  title?: string;
}

const ModalMenu: FC<ModalMenuProps> = (props) => {
  const { onClose } = props;
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const { user } = userStore();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={handleCloseClick}></button>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <div className={styles.icon}>{user?.name[0].toUpperCase()}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{user?.name}</div>
              <div className={styles.balance}>Balance:</div>
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.menu}>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );

  if (!modalRoot) return null;

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default ModalMenu;
