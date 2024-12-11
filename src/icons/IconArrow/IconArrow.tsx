import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconArrowProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconArrow: FC<IconArrowProps> = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.08002'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default memo(IconArrow);
