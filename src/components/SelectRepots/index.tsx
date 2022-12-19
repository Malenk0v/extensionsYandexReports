import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsReport } from '../../redux/slice/report';
import { options, selectReport } from '../../utils/listReports';

export const SelectRepots: React.FC = () => {
  const login = useSelector((state: RootState) => state.report.login.value);
  const listRep = useSelector((state: RootState) => state.report.reports);
  const dispatch = useDispatch();
  const [select, setSelect] = React.useState<selectReport | null>(null);
  const handeSelect = (e: any) => {
    dispatch(setIsReport(JSON.parse(e.target.value)));
  };
  React.useEffect(() => {
    setSelect(null);
  }, [login]);
  return (
    <div className="form-floating">
      <select
        id="sel1"
        className="form-select"
        placeholder="Selected"
        onChange={(e: any) => handeSelect(e)}
      >
        <option disabled selected></option>
        {listRep.map((op: any) => (
          <option value={JSON.stringify(op)}>{op.label}</option>
        ))}
      </select>
      <label htmlFor="sel1" className="form-label">
        Choose a report...
      </label>
    </div>
  );
};
