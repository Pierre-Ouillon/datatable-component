import { createContext } from 'react';
import { convertToType, mySort } from '../utils';

function updateLastPage(state) {
    const lastPage = getLastPage(state.rows, state.pagination.rowsPerPage);
    const currentPage = (state.pagination.currentPage <= lastPage) ? state.pagination.currentPage : lastPage;
    return { ...state, pagination: { ...state.pagination, lastPage: lastPage, currentPage: currentPage } };
}

function calculateNewPage(askedPage, state) {
    if (askedPage < 1) {
        return 1;
    }
    else if (askedPage > state.pagination.lastPage) {
        return state.pagination.lastPage;
    }
    else {
        return askedPage;
    }
}

function applyFilter(state) {
    const afterFilterState = {
        ...state, rows: state.rows.map((e) => {
            for (const prop in state.filter) {
                const regexp = new RegExp(state.filter[prop], "gi");
                if (
                    state.filter[prop] !== ""
                    && e.formattedData[prop].search(regexp) === -1
                ) {
                    return { ...e, isDisplayed: false };
                }
            }
            return { ...e, isDisplayed: true };
        })
    };
    return (state.pagination) ? updateLastPage({ ...afterFilterState, pagination: { ...afterFilterState.pagination, currentPage: 1 } }) : afterFilterState;
}

function applySort(state) {
    const sortedRows = [...state.rows];
    sortedRows.sort((a, b) => {
        return mySort(a.data[state.sort.name], b.data[state.sort.name], state.sort.order);
    });
    return { ...state, rows: sortedRows };
}

export function datatableReducer(state, action) {
    switch (action.type) {
        case 'deleteRow':{
            const deletedRow = state.rows.find((e) => e.rowId === action.rowId);
            state.eventListeners.onRowDeletion(deletedRow.data);
            const afterDeleteState = { ...state, rows: state.rows.filter((e) => e.rowId !== action.rowId) };
            return (state.pagination) ? updateLastPage(afterDeleteState) : afterDeleteState;
        }
        case 'addRow': {
            state.eventListeners.onRowAddition(action.rowData);
            const formattedData = {};
            const data = {};
            state.fields.forEach((field) => {
                data[field.name] = convertToType(action.rowData[field.name], field.type);
                formattedData[field.name] = field.formatter(data[field.name]);
            });
            return applySort(applyFilter({ ...state, rows: state.rows.concat([{ rowId: state.rows.length, isDisplayed: true, data: data, formattedData: formattedData }]) }));
        }
        case 'editRow':{
            state.eventListeners.onRowEdition(action.rowData);
            const afterEditState = {
                ...state, rows: state.rows.map((e) => {
                    if (e.rowId === action.rowId) {
                        const formattedData = {};
                        const data = {};
                        state.fields.forEach((field) => {
                            data[field.name] = convertToType(action.rowData[field.name], field.type);
                            formattedData[field.name] = field.formatter(data[field.name]);
                        });
                        return { ...e, data: data, formattedData: formattedData }
                    }
                    return e;
                })
            };
            return applySort(applyFilter(afterEditState));
        }
        case 'filterTable':
            return applyFilter({ ...state, filter: { ...state.filter, ...action.filter } });
        case 'sortTable':
            return applySort({ ...state, sort: action.sort });
        case 'goToFirstPage':
            return { ...state, pagination: { ...state.pagination, currentPage: 1 } };
        case 'goToPreviousPage':{
            const previousPage = (state.pagination.currentPage > 1) ? state.pagination.currentPage - 1 : 1;
            return { ...state, pagination: { ...state.pagination, currentPage: previousPage } };
        }
        case 'goToNextPage': {
            const nextPage = (state.pagination.currentPage < state.pagination.lastPage) ? state.pagination.currentPage + 1 : state.pagination.lastPage;
            return { ...state, pagination: { ...state.pagination, currentPage: nextPage } };
        }
        case 'goToLastPage':
            return { ...state, pagination: { ...state.pagination, currentPage: state.pagination.lastPage } };
        case 'goToPage':
            return { ...state, pagination: { ...state.pagination, currentPage: calculateNewPage(action.newPage, state) } };
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const DatatableContext = createContext({ rows: [], filter: {}, sorters: [] });
export const DatatableDispatchContext = createContext(null);

export function getLastPage(rows, rowsPerPage) {
    const displayedRows = rows.filter((row) => row.isDisplayed);
    return Math.ceil(displayedRows.length / rowsPerPage);
}