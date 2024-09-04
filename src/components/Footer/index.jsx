import React, { useContext } from 'react';
import { DatatableContext, DatatableDispatchContext } from '../../contexts/DatatableContext';
import {StyledFooter, StyledFooterButton} from './index.styled';
import firstIcon from '../../assets/images/icon_first_black.png';
import previousIcon from '../../assets/images/icon_previous_black.png';
import nextIcon from '../../assets/images/icon_next_black.png';
import lastIcon from '../../assets/images/icon_last_black.png';
import Input from '../Input';

const Footer = () => {
    const datatableState = useContext(DatatableContext);
    const dispatch = useContext(DatatableDispatchContext);
    const handleKeyPress = (e) => {
        (e.charCode === 13 && dispatch({type:"goToPage", newPage: e.target.value}));
    }
    return ( 
            <StyledFooter>
                <StyledFooterButton disabled={(datatableState.pagination.currentPage === 1)} onClick={() => dispatch({type:"goToFirstPage"})}>
                    <img src={firstIcon} alt='go to first page'></img>
                </StyledFooterButton>
                <StyledFooterButton disabled={(datatableState.pagination.currentPage === 1)} onClick={() => dispatch({type:"goToPreviousPage"})}>
                    <img src={previousIcon} alt='go to previous page'></img>
                </StyledFooterButton>
                <Input onKeyPress={handleKeyPress} key={datatableState.pagination.currentPage} initialValue={datatableState.pagination.currentPage} width='2em'></Input>
                <StyledFooterButton disabled={(datatableState.pagination.currentPage === datatableState.pagination.lastPage)} onClick={() => dispatch({type:"goToNextPage"})}>
                    <img src={nextIcon} alt='go to next page'></img>
                </StyledFooterButton>
                <StyledFooterButton disabled={(datatableState.pagination.currentPage === datatableState.pagination.lastPage)} onClick={() => dispatch({type:"goToLastPage"})}>
                    <img src={lastIcon} alt='go to last page'></img>
                </StyledFooterButton>
            </StyledFooter>
    );
};

export default Footer;
