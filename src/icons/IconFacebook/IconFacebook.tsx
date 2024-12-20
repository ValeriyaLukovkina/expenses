import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconFacebookProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconFacebook: FC<IconFacebookProps> = (props) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M14.7956 25V14.0703H18.3496L18.8779 9.79094H14.7956V7.06518C14.7956 5.83032 15.1272 4.98485 16.8355 4.98485H19V1.16959C17.9468 1.05249 16.8882 0.995949 15.829 1.00023C12.6877 1.00023 10.5308 2.98987 10.5308 6.64245V9.78294H7V14.0623H10.5386V25H14.7956Z'
        fill='#4092FF'
      />
    </svg>
  );
};

export default memo(IconFacebook);
