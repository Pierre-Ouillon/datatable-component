import React, {useContext} from 'react';

import { StyledSortableHeaderCell, StyledLabel } from './index.styled.js';
import { StyledFlexDiv } from '../../../style';
import { TextContext } from '../../contexts/textContext.jsx';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';
import getIcon from '../../icons.js';

const nextSortState = (sortState) => {
    switch(sortState){
        case "unsorted":
        case "desc":
            return "asc";
        case "asc":
            return "desc";
        default: 
            return "unsorted";
    }
};

const SortableHeaderCell = ({ sortState = "unsorted", name, children }) => {
    const text = useContext(TextContext);
    const dispatch = useContext(DatatableDispatchContext);
    const src = getIcon(sortState);

    let title;
    switch(sortState){
        case "asc":
            title = text.ascSortIconTitle;
            break;
        case "desc": 
            title = text.descSortIconTitle;
            break;
        case "unsorted":
        default:
            title = text.unsortedIconTitle;
    }

    return (
    <StyledSortableHeaderCell $sortState={sortState} onClick={() => {dispatch({type: "sortTable", sort: {name: name, order: nextSortState(sortState)}})}}>
        <StyledFlexDiv>
            <StyledLabel>{children}</StyledLabel>
            <div>
                <img src={src} alt={title} title={title}></img>
            </div>
        </StyledFlexDiv>
    </StyledSortableHeaderCell>
    );
};

export default SortableHeaderCell;