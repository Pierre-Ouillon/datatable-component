import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import Row from './Subcomponents/Row';
import { DatatableContext, DatatableDispatchContext, datatableReducer, getLastPage } from '../../contexts/DatatableContext';
import {
    StyledContainer,
    StyledTable,
    StyledImg,
    StyledButtonAdd,
    StyledImgContainer
} from './index.styled';
import addIcon from '../../assets/images/icon_plus.png';
import AddRowPopin from './Subcomponents/AddRowPopin';
import Header from './Subcomponents/Header';
import Footer from './Subcomponents/Footer';

const Datatable = ({ columns, initialData, options, onRowAddition = () => {}, onRowEdition = () => {}, onRowDeletion = () => {} }) => {
    let rows = [];
    const emptyRowData = {};
    const initialFilter = {};
    const initialSort = {};
    let defaultSort;
    
    initialData.forEach((element, index) => {
        rows.push({ rowId: index, isDisplayed: true, data: element })
    });

    columns.forEach((e) => {
        if (e.filterable) {
            initialFilter[e.name] = "";
        }

        if (e.sortable) {
            if(e.defaultSort){
                initialSort[e.name] = e.defaultSort;
                defaultSort = {name: e.name, order: e.defaultSort};
            }
            else{
                initialSort[e.name] = 'unsorted';
            }
        }
    });

    for(const prop in initialData[0]){
        emptyRowData[prop] = "";
    }

    (defaultSort && rows.sort((a, b) => {
        return (defaultSort.order === 'asc') ? a.data[defaultSort.name] > b.data[defaultSort.name] : a.data[defaultSort.name] < b.data[defaultSort.name]
    }));

    const initialState = {
        rows: rows,
        filter: initialFilter,
        sort: initialSort,
        emptyRowData: emptyRowData,
        eventListeners: {onRowAddition: onRowAddition, onRowEdition: onRowEdition, onRowDeletion: onRowDeletion}
    };

    if(options?.rowsPerPage){
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
    const start = (datatableState.pagination) ? (datatableState.pagination.currentPage-1) * datatableState.pagination.rowsPerPage : 0;
    for (const row of datatableState.rows){
        if(row.isDisplayed){
            if(!datatableState.pagination || cpt >= start){
                displayedRows.push(<Row key={row.rowId} columns={columns} row={row.data} id={row.rowId}></Row>);
            }
            cpt++;
        }
        if(datatableState.pagination && cpt >= start + datatableState.pagination.rowsPerPage){
            break;
        }
    }

    return (
        <DatatableContext.Provider value={datatableState}>
            <DatatableDispatchContext.Provider value={dispatch}>
                <StyledContainer>
                    <StyledButtonAdd onClick={() => setPopinDisplayed(true)}>
                        Add a new line
                        <StyledImgContainer><StyledImg src={addIcon}></StyledImg></StyledImgContainer>
                    </StyledButtonAdd>
                    <StyledTable>
                        <Header columns={columns}></Header>
                        <tbody>
                            {displayedRows}
                        </tbody>
                    </StyledTable>
                    {(options?.rowsPerPage) && <Footer></Footer>}
                </StyledContainer>
                {(popinDisplayed && <AddRowPopin columns={columns} setIsDisplayed={setPopinDisplayed}></AddRowPopin>)}
            </DatatableDispatchContext.Provider>
        </DatatableContext.Provider>
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