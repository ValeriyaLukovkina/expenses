import { memo } from 'react';

import type { FC, SVGAttributes } from 'react';

export interface IconTravelProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const IconTravel: FC<IconTravelProps> = (props) => {
  return (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M2 22H22M6.36 17.3999L4 16.9999L2 12.9999L3.1 12.4499C3.37916 12.3092 3.6874 12.2359 4 12.2359C4.3126 12.2359 4.62084 12.3092 4.9 12.4499L5.07 12.5499C5.34916 12.6905 5.6574 12.7638 5.97 12.7638C6.2826 12.7638 6.59084 12.6905 6.87 12.5499L8 11.9999L5 5.99988L5.9 5.54988C6.23267 5.38622 6.60429 5.31826 6.97335 5.35358C7.34242 5.3889 7.6944 5.5261 7.99 5.74988L12.01 8.74988C12.3066 8.97559 12.6604 9.11392 13.0315 9.14926C13.4025 9.1846 13.7761 9.11554 14.11 8.94988L18.3 6.88988C18.8354 6.61997 19.4523 6.55936 20.03 6.71988L21 6.99988C21.2004 7.05554 21.3859 7.15515 21.543 7.29148C21.7001 7.42782 21.8248 7.59744 21.9082 7.78802C21.9915 7.97861 22.0313 8.18536 22.0247 8.39326C22.0181 8.60115 21.9652 8.80497 21.87 8.98988L21.49 9.74988C21.26 10.2099 20.89 10.5899 20.42 10.8299L7.58 17.1999C7.20245 17.3869 6.77547 17.4499 6.36 17.3799V17.3999Z"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>  
  );
};

export default memo(IconTravel);