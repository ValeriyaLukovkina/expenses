import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Calendar from '@/components/Calendar/Calendar';
import styles from './ModalCalendar.module.css';

import type { FC } from 'react';
import type { Dayjs } from 'dayjs';
import Button from '@/components/UI/Button/Button';

interface ModalCalendarProps {
  onClose: () => void;
  selectedDate?: Dayjs;
  onChangeDate?: (date: Dayjs) => void;
}

const ModalCalendar: FC<ModalCalendarProps> = (props) => {
  const { onClose, selectedDate, onChangeDate } = props;
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleChangeDate = (date: Dayjs) => {
    if (onChangeDate) onChangeDate(date);

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal}>
          <Calendar initialDate={selectedDate} onChangeDate={handleChangeDate} />
          <Button
            variant='reversed'
            size='s'
            radius='m'
            className={styles.close}
            onClick={handleCloseClick}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  if (!modalRoot) return null;

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default ModalCalendar;
