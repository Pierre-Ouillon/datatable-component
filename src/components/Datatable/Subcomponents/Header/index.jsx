import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, StyledHeaderCell } from './index.styled';
import Input from '../Input';
import { DatatableContext, DatatableDispatchContext } from '../../contexts/DatatableContext';
import SortableHeaderCell from '../SortableHeaderCell';

const Header = ({ fields }) => {
    const dispatch = useContext(DatatableDispatchContext);
    const datatableState = useContext(DatatableContext);
    return (
        <StyledHeader>
            <tr>
                {fields.map((item, i) => {
                    return (item.sortable 
                        ? <SortableHeaderCell name={item.name} sortState={datatableState.sort[item.name]} key={i}>{item.label}</SortableHeaderCell> 
                        : <StyledHeaderCell key={i}>{item.label}</StyledHeaderCell>);
                })}
                <StyledHeaderCell key={fields.length + 1}>Actions</StyledHeaderCell>
            </tr>
            <tr>
                {fields.map((item, i) => {
                    return <StyledHeaderCell key={i}>
                        {(item.filterable && <Input name={item.name} onChange={(e) => {
                            dispatch({ type: "filterTable", filter: { [e.target.name]: e.target.value } });
                        }}></Input>)}
                    </StyledHeaderCell>
                })}
                <StyledHeaderCell key={fields.length + 1}></StyledHeaderCell>
            </tr>
        </StyledHeader>
    );
};

Header.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Header;