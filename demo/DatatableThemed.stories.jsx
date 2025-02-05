import Datatable from '../src/Datatable/Datatable';
import data from './data.json';

const formatLoginDate = (value) => new Intl.DateTimeFormat("fr-FR", {timeStyle: "medium", dateStyle: "short"}).format(value);
const formatSalary = (value) => {
  let parts = value.toFixed(2).split(".");
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
  rowsPerPage: 10,
  theme: {
    table_border:"1px solid steelblue",
    header_bg:"LightSteelBlue",
    header_font:"black",
    header_separator:"1px solid steelblue",
    body_bg_even:"rgba(225, 245, 254, 1)",
    body_bg_odd:"rgba(225, 245, 254, 1)",
    body_font_even:"rgba(0, 119, 190, 1)",
    body_font_odd:"rgba(0, 119, 190, 1)",
    cell_border:"1px solid steelblue",
    button_bg:"rgb(39, 162, 252)",
    button_bg_hover:"rgb(125, 199, 253)",
    button_bg_disabled:"lightsteelblue",
    button_font:"white",
    button_border:"1px solid darkblue",
    popin_title_bg:"orangered",
    popin_title_font:"indigo",
    sort_icons: "black",
    pagination_icons: "white",
    button_icons: "white",
    popin_icons: "black"
  }
};

function onRowEdit(row){
  console.log("onRowEdit:");
  console.log(row);
}

export const Default = {
  args: {
    columns: columns,
    options: options,
    initialData: data,
    onRowEdition: onRowEdit
  }
};

const meta = {
  component: Datatable,
};

export default meta;