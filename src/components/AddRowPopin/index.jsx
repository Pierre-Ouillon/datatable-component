import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { StyledPopin, StyledOverlay, StyledTitle, StyledTitleImg, StyledHr, StyledButtonValid } from './index.styled';
import AddRowInput from '../AddRowInput';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';
import xMark from '../../assets/images/icon_x_mark_white.png';

const AddRowPopin = ({columns, setIsDisplayed}) => {
    const [formData, setFormData] = useState({});
    const dispatch = useContext(DatatableDispatchContext);

    const handleSubmit = () => {
        dispatch({type:'addRow', rowData:formData});
        setIsDisplayed(false);
    };

    return ( 
        <>
            <StyledOverlay></StyledOverlay>
            <StyledPopin>
                <StyledTitle>Ajouter une ligne<StyledTitleImg src={xMark} onClick={() => setIsDisplayed(false)}></StyledTitleImg></StyledTitle>
                {columns.map((e, i) => {
                    return (<AddRowInput autoFocus={i === 0} key={e.name} label={e.label} name={e.name} formData={formData} setFormData={setFormData}></AddRowInput>)
                })}
                <StyledHr></StyledHr>
                <StyledButtonValid onClick={handleSubmit}>Valider</StyledButtonValid>
            </StyledPopin>
        </>
    );
};

AddRowPopin.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object)
}

export default AddRowPopin;