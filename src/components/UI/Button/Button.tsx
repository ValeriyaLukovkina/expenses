import cn from 'classnames';

import styles from './Button.module.css';

import type { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  className?: string;
  theme?: 'white' | 'dark';
  size?: 'l' | 'm' | 's';
}

const Button: FC<ButtonProps> = (props) => {
  const { theme = 'white', size, disabled, children, className, ...restProps } = props;
  const isText = typeof children === 'string';

  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.themeWhite]: theme === 'white',
          [styles.themeDark]: theme === 'dark',
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
        },
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {isText ? <span>{children}</span> : children}
    </button>
  );
};

export default Button;
