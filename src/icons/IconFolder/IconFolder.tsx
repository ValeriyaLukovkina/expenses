import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconFolderProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconFolder: FC<IconFolderProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48px'
      viewBox='0 -960 960 960'
      width='48px'
      fill='currentColor'
      {...props}
    >
      <path d='M250-340h300v-60H250v60Zm0-160h460v-60H250v60ZM140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h281l60 60h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z' />
    </svg>
  );
};

export default memo(IconFolder);