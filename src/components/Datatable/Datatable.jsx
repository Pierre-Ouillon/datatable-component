import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import Row from './Subcomponents/Row';
import { DatatableContext, DatatableDispatchContext, datatableReducer, getLastPage } from './contexts/DatatableContext';
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
import { convertToType, mySort } from './utils';

const getDefaultValues = (type) => {
    switch(type){
        case "string":
            return () => "";
        case "int":
            return () => 0;
        case "float":
            return () => 0.0;
        case "date":
            return () => new Date().toISOString().substring(0, 10);
        case "datetime":
            return () => new Date().toISOString();
    }
};

const getDefaultFormatter = (type) => {
    switch(type){
        case 'date':
            return (value) => new Intl.DateTimeFormat().format(value);
        case 'datetime':
            return (value) => new Intl.DateTimeFormat(undefined, {timeStyle: "medium", dateStyle: "medium"}).format(value);
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

const Datatable = ({ columns, initialData, options, onRowAddition = () => {}, onRowEdition = () => {}, onRowDeletion = () => {} }) => {
    let rows = [];
    let fields = columns;
    const initialFilter = {};
    const initialSort = {};
    let defaultSort;

    fields.forEach((e) => {
        if(!e.type){
            e.type = "string";
        }

        if(!e.formatter){
            e.formatter = getDefaultFormatter(e.type);
        }

        if(e.defaultValue){
            e.getDefaultValue = () => e.defaultValue;
        }
        else{
            e.getDefaultValue = getDefaultValues(e.type);
        }

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

    initialData.forEach((element, index) => {
        const data = {};
        const formattedData = {};
        fields.forEach((field) => {
            data[field.name] = convertToType(element[field.name], field.type);
            formattedData[field.name] = field.formatter(data[field.name]);
        });

        rows.push({ rowId: index, isDisplayed: true, data: data, formattedData: formattedData })
    });

    (defaultSort && rows.sort((a, b) => {
        return mySort(a.data[defaultSort.name], b.data[defaultSort.name], defaultSort.order);
    }))
    
    const initialState = {
        rows: rows,
        filter: initialFilter,
        sort: initialSort,
        fields: fields,
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
                displayedRows.push(<Row key={row.rowId} fields={fields} row={row} id={row.rowId}></Row>);
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
                        <Header fields={fields}></Header>
                        <tbody>
                            {displayedRows}
                        </tbody>
                    </StyledTable>
                    {(options?.rowsPerPage) && <Footer></Footer>}
                </StyledContainer>
                {(popinDisplayed && <AddRowPopin fields={fields} setIsDisplayed={setPopinDisplayed}></AddRowPopin>)}
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