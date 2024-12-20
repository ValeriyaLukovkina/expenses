import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconFlatwareProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconFlatware: FC<IconFlatwareProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='M302.69-100v-362.62q-47.38-4.84-80.42-40.57-33.04-35.73-33.04-87.58V-860H220v269.23h82.69V-860h30.77v269.23h81.92V-860h30.77v269.23q0 51.85-33.03 87.58-33.04 35.73-79.66 40.57V-100h-30.77Zm375.77 0v-320h-95.77v-271.92q0-64.39 32.62-111.23 32.61-46.85 93.92-55.31V-100h-30.77Z' />
    </svg>
  );
};

export default memo(IconFlatware);
