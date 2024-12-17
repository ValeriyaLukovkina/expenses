import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconDownloadProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconDownload: FC<IconDownloadProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z' />
    </svg>
  );
};

export default memo(IconDownload);