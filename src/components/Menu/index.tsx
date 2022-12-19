import React from 'react';
import { GoToReport } from '../GoToReport';
import { HistoryList } from '../HistoryList';
import cl from './Menu.module.css';

export const Menu = () => {
  return (
    <div className={cl.wrapper}>
      <GoToReport />
      <HistoryList />
    </div>
  );
};
