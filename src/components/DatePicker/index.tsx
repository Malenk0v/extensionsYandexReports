import React from 'react';
import date from 'date-and-time';
import { DATE } from '../../utils/constants';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDateFrom, setIsDateTo } from '../../redux/slice/report';

export const DatePicker: React.FC = () => {
  const valueFrom = useSelector(
    (state: RootState) => state.report.date.valueFrom
  );
  const valueTo = useSelector((state: RootState) => state.report.date.valueTo);

  const dispatch = useDispatch();
  const today = date.format(new Date(), 'YYYY-MM-DD');

  React.useEffect(() => {
    dispatch(setIsDateFrom(today));
    dispatch(setIsDateTo(today));
  }, []);

  const onChangeDateTo = (e: string) => {
    const now = new Date();
    switch (e) {
      case DATE[0]:
        {
          const today = date.format(now, 'YYYY-MM-DD');
          dispatch(setIsDateFrom(today));
        }
        break;
      case DATE[1]:
        {
          const temp = now.setDate(now.getDate() - 7);
          const newDate = new Date(temp);
          const result = date.format(newDate, 'YYYY-MM-DD');
          dispatch(setIsDateFrom(result));
        }
        break;
      case DATE[2]:
        {
          const temp = now.setMonth(now.getMonth() - 1);
          const newDate = new Date(temp);
          const result = date.format(newDate, 'YYYY-MM-DD');
          dispatch(setIsDateFrom(result));
        }
        break;
      case DATE[3]:
        {
          const temp = now.setMonth(now.getMonth() - 6);
          const newDate = new Date(temp);
          const result = date.format(newDate, 'YYYY-MM-DD');
          dispatch(setIsDateFrom(result));
        }
        break;
      case DATE[4]:
        {
          const temp = now.setFullYear(now.getFullYear() - 1);
          const newDate = new Date(temp);
          const result = date.format(newDate, 'YYYY-MM-DD');
          dispatch(setIsDateFrom(result));
        }
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <div>
        <div className="form-floating mt-3 mb-3">
          <input
            id="datefrom"
            className="form-control"
            value={valueFrom}
            onChange={(e) => {
              dispatch(setIsDateFrom(e.target.value));
            }}
            type="date"
            name="from"
          />
          <label htmlFor="datefrom">From:</label>
        </div>

        <div className="form-floating mt-3 mb-3">
          <input
            id="dateto"
            className="form-control"
            value={valueTo}
            onChange={(e) => {
              dispatch(setIsDateTo(e.target.value));
            }}
            type="date"
            name="from"
          />
          <label htmlFor="dateto">To:</label>
        </div>
      </div>
      <div className="">
        {DATE.map((date) => (
          <button
            className="btn btn-outline-warning m-1"
            key={date}
            onClick={() => onChangeDateTo(date)}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};
