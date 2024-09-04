import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { StyledSortableHeaderCell, StyledLabel } from './index.styled';
import { StyledFlexDiv } from '../../style';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';
import initialSortIcon from '../../assets/images/icon_sort_initial_white.png';
import upSortIcon from '../../assets/images/icon_sort_up_white.png';
import downSortIcon from '../../assets/images/icon_sort_down_white.png';

const nextSortState = (sortState) => {
    switch(sortState){
        case 'unsorted':
        case 'desc':
            return 'asc';
        case 'asc':
            return 'desc';
        default: return 'unsorted';
    }
};

const getSortIcon = (sortState) => {
    switch(sortState){
        case 'unsorted': return [initialSortIcon, "sortable"];
        case 'asc': return [upSortIcon, "sorted by ascending order"];
        case 'desc': return [downSortIcon, "sorted by descending order"];
        default: return ["", "error"];
    }
};

const SortableHeaderCell = ({ sortState = "unsorted", name, children }) => {
    const dispatch = useContext(DatatableDispatchContext);
    const [src, alt] = getSortIcon(sortState);
    return (
    <StyledSortableHeaderCell $sortState={sortState} onClick={() => {dispatch({type: "sortTable", sort: {name: name, order: nextSortState(sortState)}})}}>
        <StyledFlexDiv>
            <StyledLabel>{children}</StyledLabel>
            <img src={src} alt={alt}></img>
        </StyledFlexDiv>
    </StyledSortableHeaderCell>
    );
};

SortableHeaderCell.propTypes = {
    initialSortState: PropTypes.string
};

export default SortableHeaderCell;