import React from 'react';

export type SlideProps = {
  title: string;
  service: string;
  setService: React.Dispatch<string>;
  isDragged: boolean;
};

export type TabsProps = {
  data: any[];
  includeAll?: boolean;
  filter?: string;
  isBool?: boolean;
  isShadowed?: boolean;
  // handleChange: (x: any) => any;
  // value: any;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
};
