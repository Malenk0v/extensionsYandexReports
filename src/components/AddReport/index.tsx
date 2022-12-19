import React from 'react';
import { useDispatch } from 'react-redux';
import { addReports, updateState } from '../../redux/slice/report';
import cl from './AddReport.module.css';

export const AddReport = () => {
  const [isAdd, setAdd] = React.useState(false);
  const [isRemove, setIsRemove] = React.useState(false);

  const [name, setName] = React.useState('');
  const [remove, setRemove] = React.useState('');
  const [url, setUrl] = React.useState('');
  const dispatch = useDispatch();
  const isData = Boolean(name) ? (Boolean(url) ? true : false) : false;
  const [listBefore, setlistBefore] = React.useState(
    JSON.parse(window.localStorage.getItem('listLocalState')!)
  );
  React.useEffect(() => {
    setlistBefore(JSON.parse(window.localStorage.getItem('listLocalState')!));
  }, [isRemove]);
  const handleSend = () => {
    const rep: any = {
      value: url,
      label: name,
    };
    dispatch(addReports(rep));
    setAdd(false);
  };
  const handleSendRemove = () => {
    const temp = listBefore.filter((obj: any) => obj.value !== remove);
    window.localStorage.setItem('listLocalState', JSON.stringify(temp));
    setlistBefore(temp);
    setIsRemove(false);
    dispatch(updateState());
  };
  const buttontextRemove = isRemove ? 'x' : 'Remove Report';
  const buttontextAdd = isAdd ? 'x' : 'Add Report';
  return (
    <div className={cl.wrapper}>
      <div>
        <div>
          <button
            disabled={isRemove}
            onClick={() => setAdd(!isAdd)}
            className="mx-2 btn btn-warning"
          >
            {buttontextAdd}
          </button>
          <button
            disabled={isAdd}
            onClick={() => setIsRemove(!isRemove)}
            className="btn btn-warning mx-2"
          >
            {buttontextRemove}
          </button>
        </div>
      </div>
      <div>
        {isAdd && (
          <div>
            <form className="form-floating mt-3 mb-3">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="login"
                type="text"
              />
              <label htmlFor="name">name</label>
            </form>
            <form className="form-floating mt-3 mb-3">
              <input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="form-control"
                placeholder="login"
                type="text"
              />
              <label htmlFor="url">url:</label>
            </form>
            <button
              disabled={!isData}
              onClick={handleSend}
              className="btn btn-warning"
            >
              send
            </button>
          </div>
        )}
        {isRemove && listBefore && (
          <div>
            <div className="form-floating mt-3 mb-3">
              <select
                onChange={(e) => setRemove(e.target.value)}
                id="sel1"
                className="form-select"
                placeholder="Selected"
              >
                <option disabled selected></option>
                {listBefore.map((op: any) => (
                  <option value={op.value}>{op.label}</option>
                ))}
              </select>
              <label htmlFor="sel1" className="form-label">
                Choose a report...
              </label>
            </div>
            <button
              disabled={!isRemove}
              onClick={handleSendRemove}
              className="btn btn-warning"
            >
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
