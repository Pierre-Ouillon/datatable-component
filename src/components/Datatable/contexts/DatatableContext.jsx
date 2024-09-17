import { createContext } from 'react';
import { convertToType } from '../utils';

export const DatatableContext = createContext({rows: [],  filter:{}, sorters:[]});
export const DatatableDispatchContext = createContext(null);

export function getLastPage(rows, rowsPerPage){
    const displayedRows = rows.filter((row) => row.isDisplayed);
    return Math.ceil(displayedRows.length / rowsPerPage);
}

function updateLastPage(state){
    const lastPage = getLastPage(state.rows, state.pagination.rowsPerPage);
    const currentPage = (state.pagination.currentPage <= lastPage) ? state.pagination.currentPage : lastPage;
    return {...state, pagination: {...state.pagination, lastPage: lastPage, currentPage: currentPage}};
}

export function datatableReducer(state, action){
    switch(action.type){
        case 'deleteRow':
            const deletedRow = state.rows.find((e) => e.rowId === action.rowId);
            state.eventListeners.onRowDeletion(deletedRow.data);
            const afterDeleteState = {...state, rows: state.rows.filter((e) => e.rowId !== action.rowId)};
            return (state.pagination) ? updateLastPage(afterDeleteState) : afterDeleteState;
        case 'addRow':
            state.eventListeners.onRowAddition(action.rowData);
            const formattedData = {};
            const data = {};
            state.fields.forEach((field) => {
                data[field.name] = convertToType(action.rowData[field.name], field.type);
                formattedData[field.name] = field.formatter(data[field.name]);
            });
            const afterAddState = {...state, rows: state.rows.concat([{ rowId: state.rows.length, isDisplayed: true, data: data, formattedData: formattedData}])};
            return (state.pagination) ? updateLastPage(afterAddState) : afterAddState;
        case 'editRow':
            return {...state, rows:state.rows.map((e) => {
                if(e.rowId === action.rowId){
                    const newRowData = {...e.data, ...action.rowData};
                    state.eventListeners.onRowEdition(newRowData);
                    return {...e, data:newRowData}
                }
                return e;
            })};
        case 'filterTable':
            const newState = {...state, filter: {...state.filter, ...action.filter}};
            const afterFilterState = {...newState, rows:newState.rows.map((e) => {
                for (const prop in newState.filter) {
                    const regexp = new RegExp(newState.filter[prop], "gi");
                    if(
                        newState.filter[prop] !== "" 
                        && e.formattedData[prop].search(regexp) === -1
                    ){
                        return {...e, isDisplayed: false};
                    }
                }
                return {...e, isDisplayed: true};
            })};
            return (state.pagination) ? updateLastPage({...afterFilterState, pagination: {...afterFilterState.pagination, currentPage: 1}}) : afterFilterState;
        case 'sortTable':
            const newSort = {};
            for(const prop in state.sort){
                newSort[prop] = (action.sort.name === prop) ? action.sort.order : 'unsorted';
            }
            const sortedRows = [...state.rows];
            sortedRows.sort((a, b) => {
                return (action.sort.order === 'asc') ? a.data[action.sort.name] > b.data[action.sort.name] : a.data[action.sort.name] < b.data[action.sort.name]
            });
            return {...state, sort: newSort, rows:sortedRows};
        case 'goToFirstPage':
            return {...state, pagination: {...state.pagination, currentPage: 1}};
        case 'goToPreviousPage':
            const previousPage = (state.pagination.currentPage > 1) ? state.pagination.currentPage-1 : 1;
            return {...state, pagination: {...state.pagination, currentPage: previousPage}};
        case 'goToNextPage':
            const nextPage = (state.pagination.currentPage < state.pagination.lastPage) ? state.pagination.currentPage+1 : state.pagination.lastPage;
            return {...state, pagination: {...state.pagination, currentPage: nextPage}};
        case 'goToLastPage':
            return {...state, pagination: {...state.pagination, currentPage: state.pagination.lastPage}};
        case 'goToPage':
            return {...state, pagination: {...state.pagination, currentPage: calculateNewPage(action.newPage)}};
        default:
           throw Error('Unknown action: ' + action.type);
    }

    function calculateNewPage(askedPage){
        if(askedPage < 1){
            return 1;
        }
        else if(askedPage > state.pagination.lastPage){
            return state.pagination.lastPage;
        }
        else{
            return askedPage;
        }
    }
}