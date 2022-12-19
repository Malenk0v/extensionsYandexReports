import React from 'react';
import { useDispatch } from 'react-redux';
import { addReports } from '../../redux/slice/report';
import cl from './AddReport.module.css';

export const AddReport = () => {
  const [isAdd, setAdd] = React.useState(false);
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const dispatch = useDispatch();
  const isData = Boolean(name) ? (Boolean(url) ? true : false) : false;
  const handleSend = () => {
    const rep: any = {
      value: url,
      label: name,
    };
    dispatch(addReports(rep));
    setAdd(false);
  };
  const buttontext = isAdd ? 'x' : 'Add Report';
  return (
    <>
      <div className={cl.wrapper}>
        <div>
          <button onClick={() => setAdd(!isAdd)} className="btn btn-warning">
            {buttontext}
          </button>
        </div>
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
      </div>
    </>
  );
};
