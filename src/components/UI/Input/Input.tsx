import cn from 'classnames';
import styles from './Input.module.css';

import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
}

const Input: FC<InputProps> = (props) => {
  const { disabled, children, className, ...restProps } = props;

  return <input className={cn(styles.input, className)} disabled={disabled} {...restProps} />;
};

export default Input;
