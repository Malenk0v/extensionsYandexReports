import React from 'react';
import { DatePicker } from '../DatePicker';
import { GoToReport } from '../GoToReport';
import { Login } from '../Login';
import { SelectRepots } from '../SelectRepots';
import cl from './FormForReports.module.css';
export const FormForReports = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.content}>
        <Login />
        <SelectRepots />
        <DatePicker />
      </div>
    </div>
  );
};
