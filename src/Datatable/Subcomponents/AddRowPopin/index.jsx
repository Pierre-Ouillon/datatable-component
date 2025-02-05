import React, { useState, useContext } from 'react';
import { StyledPopin, StyledOverlay, StyledTitle, StyledTitleImg, StyledHr, StyledButtonValid } from './index.styled';
import AddRowInput from '../AddRowInput';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';
import { convertToType } from '../../utils';
import getIcon from '../../icons';
import { TextContext } from '../../contexts/textContext';

const AddRowPopin = ({fields, setIsDisplayed}) => {
    const defaultFormData = {};
    const dispatch = useContext(DatatableDispatchContext);
    const src = getIcon("close");
    const text = useContext(TextContext);
    
    fields.forEach((e) => {
        defaultFormData[e.name] = convertToType(e.getDefaultValue(), e.type);
    });
    const [formData, setFormData] = useState(defaultFormData);

    const handleSubmit = () => {
        dispatch({type:'addRow', rowData:formData});
        setIsDisplayed(false);
    };

    return ( 
        <>
            <StyledOverlay></StyledOverlay>
            <StyledPopin>
                <StyledTitle>
                    {text.addRowPopinTitle}
                    <StyledTitleImg src={src} alt={text.addRowPopinXMark} title={text.addRowPopinXMark} onClick={() => setIsDisplayed(false)}></StyledTitleImg>
                </StyledTitle>
                {fields.map((e, i) => {
                    return (
                        <AddRowInput 
                            autoFocus={i === 0} 
                            key={e.name} 
                            label={e.label} 
                            name={e.name} 
                            type={e.type} 
                            defaultValue={convertToType(e.getDefaultValue(), e.type)} 
                            formData={formData} 
                            setFormData={setFormData}
                        ></AddRowInput>
                    );
                })}
                <StyledHr></StyledHr>
                <StyledButtonValid onClick={handleSubmit}>{text.addRowPopinSubmit}</StyledButtonValid>
            </StyledPopin>
        </>
    );
};

export default AddRowPopin;