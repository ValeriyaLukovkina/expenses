import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconStartProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconStart: FC<IconStartProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='M339.92-267.31 480-352.08l140.08 85.77-36.62-160.31 123.39-106.92L544.08-548 480-698.31 415.92-549l-162.77 14.46 123.39 107.69-36.62 159.54ZM293-203.08l49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08Zm187-269.61Z' />
    </svg>
  );
};

export default memo(IconStart);
