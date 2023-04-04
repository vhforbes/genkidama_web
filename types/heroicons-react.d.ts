declare module '@heroicons/react' {
  import React from 'react';

  export interface IconProps {
    name: string;
    className?: string;
    size?: number | string;
    color?: string;
  }

  export interface OutlineIconProps extends IconProps {}

  export interface SolidIconProps extends IconProps {}

  export const HeroIconComponent: React.FC<IconProps>;
}
