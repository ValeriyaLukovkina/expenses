import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

import type { FC, InputHTMLAttributes, MouseEvent, ChangeEvent, FocusEvent } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  variant?: 'default' | 'bordered' | 'faded' | 'underlined';
  size?: 'l' | 'm' | 's';
  radius?: 'none' | 's' | 'm' | 'l' | 'round';
  label?: string;
  error?: string;
  fullWidth?: boolean;
  labelPlacement?: 'inside' | 'outside';
}

const Input: FC<InputProps> = (props) => {
  const {
    variant = 'default',
    size = 'm',
    radius = 'none',
    labelPlacement= 'inside',
    label,
    fullWidth,
    placeholder,
    value,
    error,
    disabled,
    name,
    onChange,
    onFocus,
    onBlur,
    className,
    ...restProps
  } = props;
  const [innerValue, setInnerValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);

      if (onFocus) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(false);

      if (onBlur) onBlur(e);
    },
    [onBlur],
  );

  const handleClick = useCallback((e: MouseEvent) => {
    const input = e.currentTarget.querySelector('input');

    if (input) {
      input.focus();
    }
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      setInnerValue(e.target.value);
    },
    [onChange],
  );

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div
        className={cn(styles.field, {
          [styles.labelInside]: labelPlacement === 'inside',
          [styles.labelOutside]: labelPlacement === 'outside',
          [styles.variantDefault]: variant === 'default',
          [styles.variantBordered]: variant === 'bordered',
          [styles.variantUnderlined]: variant === 'underlined',
          [styles.variantFaded]: variant === 'faded',
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
          [styles.radiusNone]: radius === 'none',
          [styles.radiusS]: radius === 's',
          [styles.radiusM]: radius === 'm',
          [styles.radiusL]: radius === 'l',
          [styles.radiusRound]: radius === 'round',
          [styles.focused]: focused,
          [styles.filled]: !!innerValue && innerValue !== 0,
          [styles.fullWidth]: fullWidth,
          [styles.errored]: !!error,
          [styles.withPlaceholer]: !!placeholder,
          [styles.withLabel]: label,
        })}
        onClick={handleClick}
      >
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.controlWrapper}>
          <input
            {...restProps}
            className={styles.control}
            value={innerValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            role='input'
            id={name}
            name={name}
          />
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
