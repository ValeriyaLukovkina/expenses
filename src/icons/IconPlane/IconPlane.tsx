import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconPlaneProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconPlane: FC<IconPlaneProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='m397.62-159.77-81.93-155.92-156.92-82.93L197-436.85l139.54 24.7 131.23-131-304.69-129.77 49.69-48.93 369.85 63.62 129.15-129.92q15.61-15.62 38.19-15.62t38.19 15.62q15.62 15.61 15.62 38.19t-15.62 38.19L659-582.62l62.85 369.85-49.7 49.69-129-304.69-131 131.23L435.08-198l-37.46 38.23Z' />
    </svg>
  );
};

export default memo(IconPlane);
