import Datatable from '../src/Datatable/Datatable';

const formatLoginDate = (value) => new Intl.DateTimeFormat("fr-FR", {timeStyle: "medium", dateStyle: "short"}).format(value);
const formatSalary = (value) => {
  let parts = value.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return "$ "+parts.join(".");
};
const columns = [
  {name: "first_name", label: "First name", type: "string", filterable: true, sortable: true},
  {name: 15, dzaa:"tet", filterable: "true", sortable: true, defaultSort:()=>{}, formatter: "ezfezgf"},
  {name: "office", label: "Office", filterable: true, defaultValue: "Paris"},
  {name: "salary", label: "Salary", type: "float", formatter: formatSalary, filterable: true, sortable: true},
  {}
];
const options = {
  rowsPerPage: "10",
  actionAddRow: "true",
  actionEditRow: 1,
  theme: {
    table_border: "1px solid rgb(210, 210, 210)",
    header_bg: "black",
    header_font: "white",
    header_separatorES: "2px solid white",
    body_bg_evenED: "rgb(233,233,233)",
  },
  text: "blablalba"
};

export const Default = {
  args: {
    columns: columns,
    options: options,
    initialData: {id: '1', label: 'label', value: 15},
    onRowAddition: true,
    onRowEdition: 'test',
    onRowDeletion: 15
  }
};

const meta = {
  component: Datatable,
};

export default meta;