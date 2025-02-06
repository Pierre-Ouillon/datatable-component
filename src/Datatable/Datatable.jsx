import React, { useState, useReducer, useMemo } from 'react';
import { format } from 'date-fns';
import { ThemeProvider } from 'styled-components';

import AddRowButton from './Subcomponents/AddRowButton';
import Header from './Subcomponents/Header';
import Row from './Subcomponents/Row';
import Footer from './Subcomponents/Footer';
import AddRowPopin from './Subcomponents/AddRowPopin';
import { DatatableContext, DatatableDispatchContext, datatableReducer, getLastPage } from './contexts/DatatableContext';
import {
    StyledContainer,
    StyledTable
} from './index.styled';
import { convertToType, mySort } from './utils';
import { TextContext } from './contexts/textContext';

const columnsProps = {
    'name': 'string',
    'label': 'string',
    'type': 'string',
    'filterable': 'boolean',
    'sortable': 'boolean',
    'defaultSort': 'string',
    'defaultValue': '*',
    'formatter': 'function'
};

const optionsProps = {
    'actionAddRow': 'boolean',
    'actionEditRow': 'boolean',
    'actionDeleteRow': 'boolean',
    'rowsPerPage': 'number',
    'theme': 'object',
    'text': 'object',
};

const defaultTheme = {
    table_border: "1px solid rgb(210,210,210)",
    header_bg: "#000000",
    header_font: "#FFFFFF",
    header_separator: "2px solid #FFFFFF",
    body_bg_even: "rgb(233,233,233)",
    body_bg_odd: "#FFFFFF",
    body_font_even: "#000000",
    body_font_odd: "#000000",
    cell_border: "1px solid rgb(210,210,210)",
    button_bg: "#FFFFFF",
    button_bg_hover: "rgb(233,233,233)",
    button_bg_disabled: "rgb(240,240,240)",
    button_font: "#000000",
    button_border: "1px solid gray",
    popin_title_bg: "linear-gradient(#000000, #808080)",
    popin_title_font: "#FFFFFF",
    button_icons: "black",
    sort_icons: "white",
    pagination_icons: "black",
    popin_icons: "white"
};

const defaultText = {
    "addRowButton": "Add a new row",
    "addRowPopinTitle": "Add a new row",
    "addRowPopinXMark": "Close the pop-in",
    "addRowPopinSubmit": "Submit",
    "actionCellEditTitle": "Edit the row",
    "actionCellDeleteTitle": "Delete the row",
    "actionCellSubmitTitle": "Submit the changes",
    "actionCellCancelTitle": "Cancel the changes",
    "paginationFirstTitle": "Go to the first page",
    "paginationPreviousTitle": "Go to the previous page",
    "paginationNextTitle": "Go to the next page",
    "paginationLastTitle": "Go to the last page",
    "unsortedIconTitle": "sortable, click to sort by ascending order",
    "ascSortIconTitle": "sorted by ascending order, click to sort by descending order",
    "descSortIconTitle": "sorted by descending order, click to sort by ascending order"
};

const getDefaultValues = (type) => {
    switch (type) {
        case "string":
            return () => "";
        case "int":
            return () => 0;
        case "float":
            return () => 0.0;
        case "date":
            return () => format(new Date(), 'yyyy-MM-dd');
        case "datetime":
            return () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
};

const getDefaultFormatter = (type) => {
    switch (type) {
        case 'date':
            return (value) => new Intl.DateTimeFormat().format(value);
        case 'datetime':
            return (value) => new Intl.DateTimeFormat(undefined, { timeStyle: "medium", dateStyle: "medium" }).format(value);
        case 'float':
            return (value) => {
                let parts = value.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
        case 'int':
            return (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        case 'string':
        default:
            return (value) => value;
    }
};

const validateParams = (columns, initialData, options, onRowAddition, onRowEdition, onRowDeletion) => {
    let errors = [];

    if (columns instanceof Array && columns.length > 0) {
        errors = errors.concat(validateColumns(columns));
    }
    else {
        errors.push("Datatable-component error: 'columns' is a required argument, and it needs to be an Array")
    }

    if (!(initialData instanceof Array)) {
        errors.push("Datatable-component error: 'initialData' is a " + typeof initialData + ", Array expected");
    }

    if (options instanceof Object) {
        errors = errors.concat(validateOptions(options));
    }
    else {
        errors.push("Datatable-component error: 'options' is a " + typeof +", Object expected")
    }

    if (!(onRowAddition instanceof Function)) {
        errors.push("Datatable-component error: 'onRowAddition' is a " + typeof onRowAddition + ", Function expected");
    }
    if (!(onRowEdition instanceof Function)) {
        errors.push("Datatable-component error: 'onRowEdition' is a " + typeof onRowEdition + ", Function expected");
    }
    if (!(onRowDeletion instanceof Function)) {
        errors.push("Datatable-component error: 'onRowDeletion' is a " + typeof onRowDeletion + ", Function expected");
    }

    return errors;
}

const validateColumns = (columns) => {
    const errors = [];
    let i = 1;
    columns.forEach(column => {
        if (column['name'] === undefined) {
            errors.push("Datatable-component error for column " + i + ": 'name' is a required property");
        }
        for (const prop in column) {
            if (columnsProps[prop] === undefined) {
                errors.push("Datatable-component error for column " + i + ": " + prop + " isn't a valid property");
            } else if (columnsProps[prop] !== '*' && typeof column[prop] !== columnsProps[prop]) {
                errors.push("Datatable-component error for column " + i + ": the property '" + prop + "' is of type " + typeof column[prop] + ", " + columnsProps[prop] + " expected");
            }
        }
        i++;
    });
    return errors;
}

const validateOptions = (options) => {
    let errors = [];
    
    for (const prop in options) {
        if (optionsProps[prop] === undefined) {
            errors.push("Datatable-component error: " + prop + " isn't a valid option");
        } else if (optionsProps[prop] !== '*' && typeof options[prop] !== optionsProps[prop]) {
            errors.push("Datatable-component error: the option '" + prop + "' is of type " + typeof options[prop] + ", " + optionsProps[prop] + " expected");
        }
        else if(prop === 'theme'){
            errors = errors.concat(validateAdvancedOptions('theme', options.theme, defaultTheme))   
        }
        else if (prop === 'text'){
            errors = errors.concat(validateAdvancedOptions('text', options.text, defaultText))   
        }
    }

    return errors;
}

const validateAdvancedOptions = (optionName, optionObject, validOptions) => {
    const errors = [];
    for (const prop in optionObject) {
        if (validOptions[prop] === undefined) {
            errors.push("Datatable-component error: '" + prop + "' isn't a valid property for the '"+optionName+"' option");
        }
    }
    return errors;
}

const Datatable = ({ columns, initialData = [], options = {}, onRowAddition = () => { }, onRowEdition = () => { }, onRowDeletion = () => { } }) => {
    const errors = validateParams(columns, initialData, options, onRowAddition, onRowEdition, onRowDeletion)
    if(errors.length > 0){
        console.error(errors);
        throw new Error("A Datatable component is incorrectly configured, check the console logs to see the details")
    }
    let rows = [];
    let fields = [];
    columns.forEach((e) => fields.push({...e}));
    const text = useMemo(() => { return {...defaultText, ...options?.text} }, options.text)
    const theme = useMemo(() => { return { ...defaultTheme, ...options?.theme } }, options.theme)
    const initialFilter = {};
    let initialSort;

    fields.forEach((e) => {
        if (!e.type) {
            e.type = "string";
        }

        if (!e.formatter) {
            e.formatter = getDefaultFormatter(e.type);
        }

        if (e.defaultValue) {
            e.getDefaultValue = (typeof e.defaultValue === 'function') ? e.defaultValue : () => e.defaultValue;
        }
        else {
            e.getDefaultValue = getDefaultValues(e.type);
        }

        if (e.filterable) {
            initialFilter[e.name] = "";
        }

        if (e.sortable && e.defaultSort) {
            initialSort = { name: e.name, order: e.defaultSort };
        }
    });

    initialData.forEach((element, index) => {
        const data = {};
        const formattedData = {};
        fields.forEach((field) => {
            data[field.name] = (element[field.name] !== undefined) ? convertToType(element[field.name], field.type) : '';
            formattedData[field.name] = field.formatter(data[field.name]);
        });

        rows.push({ rowId: index, isDisplayed: true, data: data, formattedData: formattedData })
    });

    (initialSort && rows.sort((a, b) => {
        return mySort(a.data[initialSort.name], b.data[initialSort.name], initialSort.order);
    }))

    const initialState = {
        rows: rows,
        filter: initialFilter,
        sort: initialSort,
        fields: fields,
        actionColumn: (options?.actionEditRow || options?.actionDeleteRow),
        actionEditRow: options?.actionEditRow,
        actionDeleteRow: options?.actionDeleteRow,
        eventListeners: { onRowAddition: onRowAddition, onRowEdition: onRowEdition, onRowDeletion: onRowDeletion }
    };

    if (options?.rowsPerPage) {
        initialState.pagination = {
            currentPage: 1,
            rowsPerPage: options.rowsPerPage,
            lastPage: getLastPage(rows, options.rowsPerPage)
        };
    }

    const [popinDisplayed, setPopinDisplayed] = useState(false);
    const [datatableState, dispatch] = useReducer(datatableReducer, initialState);

    const displayedRows = [];
    let cpt = 0;
    const start = (datatableState.pagination) ? (datatableState.pagination.currentPage - 1) * datatableState.pagination.rowsPerPage : 0;
    for (const row of datatableState.rows) {
        if (row.isDisplayed) {
            if (!datatableState.pagination || cpt >= start) {
                displayedRows.push(<Row key={row.rowId} fields={fields} row={row} id={row.rowId}></Row>);
            }
            cpt++;
        }
        if (datatableState.pagination && cpt >= start + datatableState.pagination.rowsPerPage) {
            break;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <TextContext.Provider value={text}>
                <DatatableContext.Provider value={datatableState}>
                    <DatatableDispatchContext.Provider value={dispatch}>
                        <StyledContainer>
                        {(options?.actionAddRow && <AddRowButton setPopinDisplayed={setPopinDisplayed}></AddRowButton>)}
                            <StyledTable>
                                <Header fields={fields}></Header>
                                <tbody>
                                    {displayedRows}
                                </tbody>
                            </StyledTable>
                            {(options?.rowsPerPage && <Footer></Footer>)}
                        </StyledContainer>
                        {(popinDisplayed && <AddRowPopin fields={fields} setIsDisplayed={setPopinDisplayed}></AddRowPopin>)}
                    </DatatableDispatchContext.Provider>
                </DatatableContext.Provider>
            </TextContext.Provider>
        </ThemeProvider>
    );
};

export default Datatable;