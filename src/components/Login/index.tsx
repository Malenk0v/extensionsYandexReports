import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../redux/slice/report';
import { RootState } from '../../redux/store';

export const Login: React.FC = () => {
  const login = useSelector((state: RootState) => state.report.login.value);
  const dispatch = useDispatch();

  return (
    <>
      <form className="form-floating mt-3 mb-3">
        {/* <h2>Write login:</h2> */}
        <input
          id="login"
          className="form-control"
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setIsLogin(e.target.value))
          }
          placeholder="login"
          type="text"
        />
        <label htmlFor="login">Write login:</label>
        {/* <button onClick={(e) => handleSubmit(e)}>next</button> */}
      </form>
    </>
  );
};
