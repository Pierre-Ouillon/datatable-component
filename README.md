# Datatable-Component

## What is datatable-component

Datatable-component add a new component called Datatable.
This component let you create easily a table to display any kind of datas. 
It offers built-in functionalities like filterable and sortable columns, pagination and actions to add, edit or delete rows.

## Getting started

### Installation
`npm install --save @pierre-ouillon/datatable-component`

### Basic Usage
``` js
import React from 'react';
import Datatable from '@pierre-ouillon/datatable-component';

const data = [
    {"country":"People's Republic of China", "GoldMedals": 11, "SilverMedals": 7, "BronzeMedals": 3, "TotalMedals": 21},
    {"country":"France", "GoldMedals": 8, "SilverMedals": 10, "BronzeMedals": 8, "TotalMedals": 26},
    {"country":"Japan", "GoldMedals": 8, "SilverMedals": 3, "BronzeMedals": 4, "TotalMedals": 15},
    {"country":"Australia", "GoldMedals": 7, "SilverMedals": 6, "BronzeMedals": 4, "TotalMedals": 17},
    {"country":"United States of America", "GoldMedals": 6, "SilverMedals": 13, "BronzeMedals": 12, "TotalMedals": 31},
    {"country":"United Kingdom", "GoldMedals": 6, "SilverMedals": 7, "BronzeMedals": 7, "TotalMedals": 20},
    {"country":"Republic of Korea", "GoldMedals": 6, "SilverMedals": 3, "BronzeMedals": 3, "TotalMedals": 12},
    {"country":"Italy", "GoldMedals": 3, "SilverMedals": 6, "BronzeMedals": 4, "TotalMedals": 13},
    {"country":"Canada", "GoldMedals": 2, "SilverMedals": 2, "BronzeMedals": 3, "TotalMedals": 7},
    {"country":"Germany", "GoldMedals": 2, "SilverMedals": 2, "BronzeMedals": 2, "TotalMedals": 6}
];

function App() {
	const columns = [
		{ name: "country", label: "Country"},
		{ name: "GoldMedals", label: "Gold Medals"},
		{ name: "SilverMedals", label: "Silver Medals"},
		{ name: "BronzeMedals", label: "Bronze Medals"},
		{ name: "TotalMedals", label: "Total"},
	];
	return <Datatable columns={columns} initialData={data}></Datatable>
}

export default App;
```

### Demo
A demo is included if you want to try it before adding it to your project.   
 - Clone the repository: `git clone https://github.com/Pierre-Ouillon/datatable-component.git`  
 - Install the required packages: `npm install`  
 - Start the demo: `npm start`  

## Datatable props

### Example with all the props
``` js
import React from 'react';
import Datatable from '@pierre-ouillon/datatable-component';
import data from './data.json';

function App() {
	const formatSalary = (value) => {
	  let parts = value.toFixed(2).split(".");
	  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	  return "$ "+parts.join(".");
	};

	function onRowEdit(row){
	  console.log("rowEdited !");
	  console.log(row);
	}

	const columns = [
	  {name: "first_name", label: "First name", type: "string", filterable: true, sortable: true},
	  {name: "name", label: "Name", filterable: true, sortable: true, defaultSort:"asc"},
	  {name: "position", label: "Position", filterable: true, sortable: false},
	  {name: "office", label: "Office", filterable: true, defaultValue: "Paris"},
	  {name: "start_date", label: "Start date", type: "date", filterable: true, sortable: true},
	  {name: "salary", label: "Salary", type: "float", formatter: formatSalary, filterable: true, sortable: true},
	  {name: "holidays", label: "Holidays", type: "int", filterable: true, sortable: true},
	];

	const options = {
	  rowsPerPage: 10,
	  actionAddRow: true,
	  actionEditRow: true,
	  actionDeleteRow: true,
	};

	return <Datatable columns={columns} initialData={data} options={options} onRowEdition={onRowEdit}></Datatable>
}

export default App;
```

### columns
`columns` is the only required prop to create a datatable. 
It is an array of objects which describe a column of the table.

#### List of all the properties for a column
| Name         | Type     | Default  | Description                                                                                                                                                                                                                                                                                                             |
|--------------|----------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name         | string   |          | The property to read from `initialData`   __Required__                                                                                                                                                                                                                                                                  |
| label        | string   | ""       | The label of the column header                                                                                                                                                                                                                                                                                          |
| type         | string   | "string" | The type of data of the column.   Used when filtering or sorting the table or when defining default values for new rows list of accepted types: `int`, `float`, `date`, `datetime` and `string`                                                                                                                         |
| filterable   | boolean  | false    | Whether the column should be filterable or not. If true, it will add an input under the label to filter the table                                                                                                                                                                                                       |
| sortable     | boolean  | false    | Whether the column should be sortable or not. If true, it will add an icon next to the label to sort the table                                                                                                                                                                                                          |
| defaultSort  | string   |          | Apply a sort on a sortable column on the first render of the table.  Has no effect if `sortable` is not set for the column. If several columns have `defaultSort` set, only the last one will be applied. Possible values: 'asc' and 'desc'                                                                             |
| defaultValue |          |          | The value used to fill the inputs when adding a new row.<br> It can be of any type, even a function.<br> If it's not set a defaultValue depending of the type will be used: <ul><li>`string`: ""</li><li>`int`: 0</li><li>`float`: 0.0</li><li>`date`: format(new Date(), 'yyyy-MM-dd')</li><li>`datetime`: format(new Date(), 'yyyy-MM-dd HH:mm:ss')</li></ul> |
| formatter    | function |          | A function to customize the render of a column.  The value returned will be displayed in the cell. If it's not set a formatting by default depending of the type will be applied : <ul><li>`string`: no formatting</li><li>`int`: split the number in three figures group</li><li>`float`: split the number in three figures group</li><li>`date`: format the date according to the locale</li><li>`datetime`: format the date according to the locale</li></ul> |

### List of all the properties of 'options'
| Name            | Type    | Default      | Description                                                                                                                                                     |
|-----------------|---------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| actionAddRow    | boolean | false        | Display a button which open a pop-in to create a new row                                                                                                        |
| actionEditRow   | boolean | false        | Display a button that let the user edit the row                                                                                                                 |
| actionDeleteRow | boolean | false        | Display a button that let the user delete the row                                                                                                               |
| rowsPerPage     | integer | null         | If set, enable pagination of the table and set the number of rows per page                                                                                      |
| theme           | object  | defaultTheme | Used to customize the datatable, each property supplied will override the default one.   For a complete list of theme properties see the Theme table            |
| text            | object  | defaultText  | Used to customize the labels of the datatable, each property supplied will override the default one. For a complete list of text properties, see the Text table |

### List of all the properties of 'options.theme'

| Name               | Default                           |
|--------------------|-----------------------------------|
| table_border       | 1px solid rgb(210,210,210)        |
| header_bg          | #000000                           |
| header_font        | #FFFFFF                           |
| header_separator   | 2px solid #FFFFFF                 |
| body_bg_even       | rgb(233,233,233)                  |
| body_bg_odd        | #FFFFFF                           |
| body_font_even     | #000000                           |
| body_font_odd      | #000000                           |
| cell_border        | 1px solid rgb(210,210,210)        |
| button_bg          | #FFFFFF                           |
| button_bg_hover    | rgb(233,233,233)                  |
| button_bg_disabled | rgb(240,240,240)                  |
| button_font        | #000000                           |
| button_border      | 1px solid gray                    |
| popin_title_bg     | linear-gradient(#000000, #808080) |
| popin_title_font   | #FFFFFF				             |
| button_icons       | black                             |
| sort_icons         | white                             |
| pagination_icons   | black                             |
| popin_icons        | white                             |

Icons properties accept only "black" and "white" as values for the moment

### List of all the properties of 'options.text'

| Name                    | Default                                                      |
|-------------------------|--------------------------------------------------------------|
| addRowButton            | Add a new row                                                |
| addRowPopinTitle        | Add a new row                                                |
| addRowPopinXMark        | Close the pop-in                                             |
| addRowPopinSubmit       | Submit                                                       |
| actionCellEditTitle     | Edit the row                                                 |
| actionCellDeleteTitle   | Delete the row                                               |
| actionCellSubmitTitle   | Submit the changes                                           |
| actionCellCancelTitle   | Cancel the changes                                           |
| paginationFirstTitle    | Go to the first page                                         |
| paginationPreviousTitle | Go to the previous page                                      |
| paginationNextTitle     | Go to the next page                                          |
| paginationLastTitle     | Go to the last page                                          |
| unsortedIconTitle       | sortable, click to sort by ascending order                   |
| ascSortIconTitle        | sorted by ascending order, click to sort by descending order |
| descSortIconTitle		  | sorted by descending order, click to sort by ascending order |
| descSortIconTitle		  | sorted by descending order, click to sort by ascending order |
