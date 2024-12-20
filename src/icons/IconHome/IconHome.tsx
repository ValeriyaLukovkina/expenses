import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconHomeProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconHome: FC<IconHomeProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='M230.77-190.77h161.54v-240h175.38v240h161.54v-373.85L480-753.46 230.77-564.87v374.1ZM200-160v-420l280-211.54L760-580v420H536.92v-240H423.08v240H200Zm280-312.23Z' />
    </svg>
  );
};

export default memo(IconHome);
