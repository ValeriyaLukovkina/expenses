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
        d='M17.885 3.77L16.115 2L6.11499 12L16.115 22L17.885 20.23L9.65499 12L17.885 3.77Z'
        fill='black'
      />
    </svg>
  );
};

export default memo(IconArrow);
