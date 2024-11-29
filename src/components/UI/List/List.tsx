import { Children } from 'react';
import cn from 'classnames';

import styles from './List.module.css';

import type { FC, PropsWithChildren } from 'react';

interface ListProps {
  className?: string;
  view?: 'default' | 'bordered' | 'splitted';
}

const List: FC<PropsWithChildren<ListProps>> = (props) => {
  const { className, children, view = 'default', ...restProps } = props;

  return (
    <div
      className={cn(
        styles.list,
        {
          [styles.viewDefault]: view === 'default',
          [styles.viewBordered]: view === 'bordered',
          [styles.viewSplitted]: view === 'splitted',
        },
        className,
      )}
    >
      {Children.map(children, (child) => {
        return <div className={styles.item}>{child}</div>;
      })}
    </div>
  );
};

export default List;
