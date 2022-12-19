import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../../redux/slice/report';
import { RootState } from '../../redux/store';

export const GoToReport = () => {
  const isReport = useSelector(
    (state: RootState) => state.report.report.isReport
  );
  const isLogin = useSelector((state: RootState) => state.report.login.isLogin);
  const isDate = useSelector((state: RootState) => state.report.date.isDate);
  const dispatch = useDispatch();
  const handleReport = () => {
    dispatch(getReport());
  };
  const check = Boolean(isReport && isLogin && isDate);
  return (
    <div>
      <button
        className={'btn btn-warning'}
        disabled={!check}
        onClick={handleReport}
        id=""
      >
        GO TO REPORT
      </button>
    </div>
  );
};
