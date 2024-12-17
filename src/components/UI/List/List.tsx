import { Children } from 'react';
import cn from 'classnames';

import styles from './List.module.css';

import type { FC, PropsWithChildren } from 'react';

interface ListProps {
  className?: string;
  view?: 'default' | 'bordered' | 'splitted' | 'shadow';
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
          [styles.viewShadow]: view === 'shadow',

        },
        className,
      )}
    >
      {Children.map(children, (child, index) => {
        return (
          <>
            <div className={styles.item}>{child}</div>
            {index !== Children.count(children) - 1 && view !== 'splitted' && <div className={styles.divider} />}
          </>
        );
      })}
    </div>
  );
};

export default List;
