import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconPlusProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconPlus: FC<IconPlusProps> = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_1_20904)'>
        <path
          d='M12 6V18'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6 12H18'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_20904'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(IconPlus);
