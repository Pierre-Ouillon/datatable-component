import React from 'react';
import ReactDOM from 'react-dom/client';
import Datatable from './components/Datatable';
import data from '../data.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
const columns = [
    {name: "country", label: "Pays", filterable:true, sortable:true},
    {name: "GoldMedals", label: "Médailles d'or", sortable:true},
    {name: "SilverMedals", label: "Médailles d'argent", sortable:true},
    {name: "BronzeMedals", label: "Médailles de bronze", sortable:true},
    {name: "TotalMedals", label: "Total", sortable:true, defaultSort:"desc"},
];
root.render(
    <React.StrictMode>
      <Datatable columns={columns} initialData={data}></Datatable>
    </React.StrictMode>
);