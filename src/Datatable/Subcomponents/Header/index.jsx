import React, { useContext } from 'react';
import { StyledHeader } from './index.styled';
import { StyledHeaderCell } from '../../../style';
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
                    const sortState = (datatableState.sort?.name === item.name) ? datatableState.sort.order : 'unsorted';
                    return (item.sortable 
                        ? <SortableHeaderCell name={item.name} sortState={sortState} key={item.name.concat('_hc')}>{item.label}</SortableHeaderCell> 
                        : <StyledHeaderCell key={item.name.concat('_hc')}>{item.label}</StyledHeaderCell>);
                })}
                {(datatableState.actionColumn && <StyledHeaderCell key={fields.length + 1}>Actions</StyledHeaderCell>)}
            </tr>
            <tr>
                {fields.map((item, i) => {
                    return <StyledHeaderCell key={item.name.concat('_fhc')}>
                        {(item.filterable && <Input name={item.name} onChange={(e) => {
                            dispatch({ type: "filterTable", filter: { [e.target.name]: e.target.value } });
                        }}></Input>)}
                    </StyledHeaderCell>
                })}
                {(datatableState.actionColumn && <StyledHeaderCell key={'actions_fhc'}></StyledHeaderCell>)}
            </tr>
        </StyledHeader>
    );
};

export default Header;