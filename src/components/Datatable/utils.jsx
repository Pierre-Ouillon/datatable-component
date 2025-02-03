import React from 'react';
import {format} from 'date-fns';
import Input from './Subcomponents/Input';
import { StyledDateTimeContainer } from './index.styled';

export const getInput = (type, value, name, formData, setFormData, autoFocus = false) => {
    const handleChange = (e) => {
        switch(e.target.type){
            case 'date':
                formData[name] = (e.target.nextSibling) ? e.target.value + "T" + e.target.nextSibling.value : e.target.value;
                break;
            case 'time':
                formData[name] = e.target.previousSibling.value + "T" + e.target.value;
                break;
            default:
                formData[name] = e.target.value;
            }
        setFormData(formData);
    };
    switch(type){
        case "datetime":
            return (
                <StyledDateTimeContainer>
                <Input autoFocus={autoFocus} type="date" initialValue={format(value, 'yyyy-MM-dd')} onChange={handleChange}></Input>
                <Input type="time" initialValue={format(value, 'HH:mm:ss')} onChange={handleChange}></Input>
                </StyledDateTimeContainer>
            );
        case "date":
            return <Input autoFocus={autoFocus} type="date" initialValue={format(value, 'yyyy-MM-dd')} onChange={handleChange}></Input>;
        default:
            return <Input type="text" initialValue={value} onChange={handleChange}></Input>
    }
};

export const convertToType = (value, type) => {
    switch(type){
        case "int":
            return parseInt(value);
        case "float": 
            return parseFloat(value);
        case "date":
        case "datetime":
            return new Date(value);
        case "string":
        default:
            return String(value);
    }
};

export const mySort = (firstValue, secondValue, sortOrder) => {
    if(typeof firstValue === 'string' ){
        firstValue = firstValue.toUpperCase();
        secondValue = secondValue.toUpperCase();
    }
    if(firstValue > secondValue){
        return (sortOrder === 'asc') ? 1 : -1;
    }
    else if(firstValue < secondValue) {
        return (sortOrder === 'asc') ? -1 : 1;
    }
    return 0;
};