import Link from 'next/link';
import cn from 'classnames';

import styles from './UILink.module.css';

import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';

interface UILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  size?: 'l' | 'm' | 's';
  isUnderlined?: boolean;
  isBlocked?: boolean;
  animated?: boolean,
  href: string;
}

const UILink: FC<PropsWithChildren<UILinkProps>> = (props) => {
  const { size = 'm', isBlocked, isUnderlined, animated, href, children, className, ...restProps } = props;

  return (
    <Link
      className={cn(
        styles.link,
        {
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
          [styles.underlined]: isUnderlined,
          [styles.blocked]: isBlocked,
          [styles.animated]: animated,
        },
        className,
      )}
      href={href}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default UILink;
