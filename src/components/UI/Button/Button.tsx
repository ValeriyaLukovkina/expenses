import { useCallback } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

import type { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  className?: string;
  variant?: 'default' | 'bordered' | 'faded' | 'light' | 'reversed';
  size?: 'l' | 'm' | 's';
  radius?: 'none' | 's' | 'm' | 'l' | 'round' | 'circle';
  fullWidth?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    variant = 'default',
    size = 'm',
    radius = 'none',
    disabled,
    children,
    className,
    fullWidth,
    ...restProps
  } = props;
  const isText = typeof children === 'string';

  const handleClick = useCallback((e: MouseEvent) => {
    const button = e.currentTarget;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = styles.ripple;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.variantDefault]: variant === 'default',
          [styles.variantBordered]: variant === 'bordered',
          [styles.variantFaded]: variant === 'faded',
          [styles.variantLight]: variant === 'light',
          [styles.variantReversed]: variant === 'reversed',
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
          [styles.radiusNone]: radius === 'none',
          [styles.radiusS]: radius === 's',
          [styles.radiusM]: radius === 'm',
          [styles.radiusL]: radius === 'l',
          [styles.radiusRound]: radius === 'round',
          [styles.radiusCircle]: radius === 'circle',
          [styles.fullWidth]: fullWidth,
        },
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      {isText ? <span>{children}</span> : children}
    </button>
  );
};

export default Button;
