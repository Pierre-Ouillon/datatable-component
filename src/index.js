import React from 'react';
import ReactDOM from 'react-dom/client';
import Datatable from './components/Datatable';
import data from '../data.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
const formatLoginDate = (value) => new Intl.DateTimeFormat("fr-FR", {timeStyle: "medium", dateStyle: "short"}).format(value);
const formatSalary = (value) => {
  var parts = value.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return "$ "+parts.join(".");
};
const columns = [
  {name: "first_name", label: "First name", type: "string", filterable: true, sortable: true},
  {name: "name", label: "Name", filterable: true, sortable: true, defaultSort:"asc"},
  {name: "position", label: "Position", filterable: true, sortable: false},
  {name: "office", label: "Office", filterable: true, defaultValue: "Paris"},
  {name: "start_date", label: "Start date", type: "date", filterable: true, sortable: true},
  {name: "salary", label: "Salary", type: "float", formatter: formatSalary, filterable: true, sortable: true},
  {name: "holidays", label: "Holidays", type: "int", filterable: true, sortable: true},
  {name: "last_login_time", label: "Last login", type: "datetime", formatter: formatLoginDate, sortable: true}
];
const options = {
  rowsPerPage: 10
};

root.render(
    <React.StrictMode>
      <Datatable columns={columns} options={options} initialData={data}></Datatable>
    </React.StrictMode>
);  