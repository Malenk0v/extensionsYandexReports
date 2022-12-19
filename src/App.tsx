import React from 'react';
import './App.css';
import { AddReport } from './components/AddReport';
import { FormForReports } from './components/FormForReports';
import { Menu } from './components/Menu';

const App: React.FC = () => {
  return (
    <div className="AppWrapper">
      <div className="App">
        <FormForReports />
        <Menu />
      </div>
      <div className="AppMenu">
        <AddReport />
      </div>
    </div>
  );
};

export default App;
