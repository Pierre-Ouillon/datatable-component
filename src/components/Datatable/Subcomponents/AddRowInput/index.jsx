import React from 'react';
import PropTypes from 'prop-types'
import { StyledWrapper, StyledLabel, StyledDateTimeContainer } from './index.styled';
import Input from '../Input';
import {getInputType} from '../../utils';

const AddRowInput = ({label, name, type, defaultValue, formData, setFormData, autoFocus}) => {
    const handleChange = (e) => {
        switch(e.target.type){
            case 'date':
                formData[name] = e.target.value + "T" + e.target.nextSibling.value;
                break;
            case 'time':
                formData[name] = e.target.previousSibling.value + "T" + e.target.value;
                break;
            default:
                formData[name] = e.target.value;
            }
        setFormData(formData);
    };

    const getInput = (type) => {
        if(type === "datetime"){
            return (
                <StyledDateTimeContainer>
                <Input type="date" autoFocus={autoFocus} initialValue={defaultValue.substring(0,10)} onChange={handleChange}></Input>
                <Input type="time" initialValue={defaultValue.substring(11, 19)} onChange={handleChange}></Input>
                </StyledDateTimeContainer>
            );
        } else{
            return <Input type={getInputType(type)} autoFocus={autoFocus} initialValue={defaultValue} onChange={handleChange}></Input>
        }
    };

    return (
        <StyledWrapper>
            <StyledLabel>{label}</StyledLabel>
            {getInput(type)}
        </StyledWrapper>
    );
};

AddRowInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    formData: PropTypes.object,
    setFormData: PropTypes.func,
    autoFocus: PropTypes.bool
};

export default AddRowInput;