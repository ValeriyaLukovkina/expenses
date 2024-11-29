'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import styles from './ButtonTabs.module.css';

import type { FC, HTMLAttributes, MouseEvent, ReactNode } from 'react';

export interface Tab<T = unknown> {
  id: string;
  label: string;
  data?: T;
}

export type OnChangeTabType = (e: MouseEvent, tab: Tab) => void

export interface ButtonTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  defaultValue?: string;
  size?: 's' | 'm' | 'l';
  onChangeTab?: OnChangeTabType;
}

const ButtonTabs: FC<ButtonTabsProps> = (props) => {
  const { className, defaultValue, tabs, size = 'm', onChangeTab, ...restProps } = props;

  const [selectedTab, setSelectedTab] = useState<string>(defaultValue || tabs[0].id);

  const handleClickTab = useCallback(
    (e: MouseEvent, tab: Tab, index: number) => {
      if (onChangeTab) {
        onChangeTab(e, tab);
      }

      setSelectedTab(tab.id);
    },
    [onChangeTab],
  );

  return (
    <div
      {...restProps}
      className={cn(
        styles.tabs,
        {
          [styles.sizeS]: size === 's',
          [styles.sizeM]: size === 'm',
          [styles.sizeL]: size === 'l',
        },
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === selectedTab;

        return (
          <button
            className={cn(styles.button, { [styles.selected]: selected })}
            type='button'
            onClick={(e: MouseEvent) => handleClickTab(e, tab, index)}
            key={tab.id}
          >
            <div>{tab.label}</div>
          </button>
        );
      })}
    </div>
  );
};

export default memo(ButtonTabs);
