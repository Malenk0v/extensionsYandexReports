import { createSlice } from '@reduxjs/toolkit';
import { options } from '../../utils/listReports';
const createListReports = () => {
  const listLocalState =
    JSON.parse(window.localStorage.getItem('listLocalState')!) || [];
  let list: any = [];
  if (listLocalState) {
    list = [...listLocalState, ...options];
  }
  if (!listLocalState) {
    list = [...options];
  }
  return list;
};
const createReport = (
  login: string,
  report: string,
  valueFrom: string,
  valueTo: string,
  label: string
) => {
  // &date_from=2021-12-17&date_to=2022-12-17&
  // &ulogin=name&

  const regLogin = /&ulogin=[a-z]*&/;
  const regDateTo = /&date_to=....-..-..&/;
  const regDateFrom = /&date_from=....-..-..&/;

  const url = report
    .replace(regLogin, `&ulogin=${login}&`)
    .replace(regDateFrom, `&date_from=${valueFrom}&`)
    .replace(regDateTo, `&date_to=${valueTo}&`);

  let temp =
    JSON.parse(window.localStorage.getItem('listReportHistory')!) || [];
  if (!temp) {
    temp = [{ login, url, date: `${label}` }];
  }
  if (temp.length === 12) {
    for (let i = temp.length - 1; i >= 0; i--) {
      if (i === 0) {
        temp[i] = { login, url, date: `${label}` };
      } else {
        temp[i] = temp[i - 1];
      }
    }
  } else {
    temp = [...temp, { login, url, date: `${label}` }];
  }
  window.localStorage.setItem('listReportHistory', JSON.stringify(temp));
  window.localStorage.getItem('listReportHistory');
  chrome.tabs.create({ url: url });
  //window.location.href = url; //testveb
};
export interface ReportState {
  reports: any;
  login: { isLogin: Boolean; value: string };
  report: { isReport: Boolean; value: string; label: '' };
  date: { isDate: Boolean; valueFrom: string; valueTo: string };
}

const initialState: ReportState = {
  reports: createListReports(),
  login: {
    isLogin: Boolean(window.localStorage.getItem('repLoginInput')) || false,
    value: window.localStorage.getItem('repLoginInput') || '',
  },
  report: { isReport: false, value: '', label: '' },
  date: { isDate: false, valueFrom: '', valueTo: '' },
};

export const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.login.value = action.payload;
      window.localStorage.setItem('repLoginInput', action.payload);
      if (state.login.value) {
        state.login.isLogin = true;
      } else {
        state.login.isLogin = false;
      }
    },
    setIsReport: (state, action) => {
      state.report.isReport = true;
      state.report.value = action.payload.value;
      state.report.label = action.payload.label;
    },
    setIsDateFrom: (state, action) => {
      state.date.isDate = true;
      state.date.valueFrom = action.payload;
    },
    setIsDateTo: (state, action) => {
      state.date.isDate = true;
      state.date.valueTo = action.payload;
    },
    getReport: (state) => {
      if (!state.date.isDate) {
        return;
      }
      const login = state.login.value;
      const report = state.report.value;
      const { valueFrom, valueTo } = state.date;
      const label = state.report.label;

      return createReport(login, report, valueFrom, valueTo, label);
    },
    addReports: (state, action) => {
      const listBefore = JSON.parse(
        window.localStorage.getItem('listLocalState')!
      );
      const listAfter = listBefore
        ? [action.payload, ...listBefore]
        : [action.payload];
      window.localStorage.setItem('listLocalState', JSON.stringify(listAfter));
      state.reports = createListReports();
      console.log('fi');
    },
  },
});

export const {
  setIsLogin,
  setIsReport,
  setIsDateFrom,
  setIsDateTo,
  getReport,
  addReports,
} = ReportSlice.actions;

export default ReportSlice.reducer;
