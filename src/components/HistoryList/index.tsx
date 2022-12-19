import React from 'react';
import cl from './HistoryList.module.css';
export const HistoryList = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const l = JSON.parse(window.localStorage.getItem('listReportHistory')!);
    setList(l);
  }, []);
  return (
    <div>
      <p
        style={{ textAlign: 'start' }}
        className="text-white text-uppercase m-1"
      >
        report history:{' '}
      </p>
      <div className={cl.forUl}>
        {list && (
          <ol style={{ textAlign: 'start', padding: '0px' }}>
            {list.map((a: any, index: number) => (
              <li className="">
                <a className={`${cl.link}`} key={a.url} href={a.url}>
                  {a.login} - "{a.date}"
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
