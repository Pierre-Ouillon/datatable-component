import React, { useContext } from 'react';
import { TextContext } from '../../contexts/textContext';
import { DatatableContext, DatatableDispatchContext } from '../../contexts/DatatableContext';
import {StyledFooter, StyledFooterButton} from './index.styled';
import Input from '../Input';
import getIcon from '../../icons';

const Footer = () => {
    const text = useContext(TextContext);
    const datatableState = useContext(DatatableContext);
    const dispatch = useContext(DatatableDispatchContext);
    const srcFirst = getIcon("first");
    const srcPrevious = getIcon("previous");
    const srcNext = getIcon("next");
    const srcLast = getIcon("last");

    const handleKeyPress = (e) => {
        (e.charCode === 13 && dispatch({type:"goToPage", newPage: e.target.value}));
    };
    const handleFocus = (e) => {
        e.target.value = datatableState.pagination.currentPage;
    };
    const handleBlur = (e) => {
        e.target.value = datatableState.pagination.currentPage+" / "+datatableState.pagination.lastPage;
    }
    const inputPageValue = datatableState.pagination.currentPage+" / "+datatableState.pagination.lastPage;
    
    return ( 
            <StyledFooter>
                <StyledFooterButton 
                    title={text.paginationFirstTitle} 
                    disabled={(datatableState.pagination.currentPage === 1)} 
                    onClick={() => dispatch({type:"goToFirstPage"})}
                >
                    <img src={srcFirst} alt={text.paginationFirstTitle}></img>
                </StyledFooterButton>
                <StyledFooterButton 
                    title={text.paginationPreviousTitle} 
                    disabled={(datatableState.pagination.currentPage === 1)} 
                    onClick={() => dispatch({type:"goToPreviousPage"})}
                >
                    <img src={srcPrevious} alt={text.paginationPreviousTitle}></img>
                </StyledFooterButton>
                <Input 
                    onKeyPress={handleKeyPress} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    key={datatableState.pagination.currentPage} 
                    initialValue={inputPageValue} 
                    width='2em'
                ></Input>
                <StyledFooterButton 
                    title={text.paginationNextTitle} 
                    disabled={(datatableState.pagination.currentPage === datatableState.pagination.lastPage)} 
                    onClick={() => dispatch({type:"goToNextPage"})}
                >
                    <img src={srcNext} alt={text.paginationNextTitle}></img>
                </StyledFooterButton>
                <StyledFooterButton 
                    title={text.paginationLastTitle} 
                    disabled={(datatableState.pagination.currentPage === datatableState.pagination.lastPage)} 
                    onClick={() => dispatch({type:"goToLastPage"})}
                >
                    <img src={srcLast} alt={text.paginationLastTitle}></img>
                </StyledFooterButton>
            </StyledFooter>
    );
};

export default Footer;
