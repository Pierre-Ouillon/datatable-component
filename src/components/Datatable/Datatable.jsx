import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
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
                var parts = value.toString().split(".");
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

const Datatable = ({ columns, initialData, options = {}, onRowAddition = () => { }, onRowEdition = () => { }, onRowDeletion = () => { } }) => {
    let rows = [];
    let fields = columns;
    const initialFilter = {};
    let initialSort;
    const defaultTheme = {
        table_border: "1px solid rgb(210, 210, 210)",
        header_bg: "black",
        header_font: "white",
        header_separator: "2px solid white",
        body_bg_even: "rgb(233,233,233)",
        body_bg_odd: "white",
        body_font_even: "black",
        body_font_odd: "black",
        cell_border: "1px solid rgb(210, 210, 210)",
        button_bg: "white",
        button_bg_hover: "rgb(233,233,233)",
        button_bg_disabled: "rgb(240,240,240)",
        button_font: "black",
        button_border: "1px solid gray",
        popin_title_bg: "linear-gradient(black, gray)",
        popin_title_font: "white",
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
        "actionCellSubmitTitle": "Submit the changes",
        "actionCellCancelTitle": "Cancel the changes",
        "actionCellEditTitle": "Edit the row",
        "actionCellDeleteTitle": "Delete the row",
        "paginationFirstTitle": "Go to the first page",
        "paginationPreviousTitle": "Go to the previous page",
        "paginationNextTitle": "Go to the next page",
        "paginationLastTitle": "Go to the last page",
        "unsortedIconTitle": "sortable, click to sort by ascending order",
        "ascSortIconTitle": "sorted by ascending order, click to sort by descending order",
        "descSortIconTitle": "sorted by descending order, click to sort by ascending order"
    };

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
            data[field.name] = convertToType(element[field.name], field.type);
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
        <ThemeProvider theme={{ ...defaultTheme, ...options?.theme }}>
            <TextContext.Provider value={{ ...defaultText, ...options?.text }}>
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

Datatable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialData: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.object,
    onRowAddition: PropTypes.func,
    onRowEdition: PropTypes.func,
    onRowDeletion: PropTypes.func
};

export default Datatable;