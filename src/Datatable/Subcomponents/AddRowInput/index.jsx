import React from 'react';
import { StyledWrapper, StyledLabel } from './index.styled';
import {getInput} from '../../utils';

const AddRowInput = ({label, name, type, defaultValue, formData, setFormData, autoFocus}) => {
    return (
        <StyledWrapper>
            <StyledLabel>{label}</StyledLabel>
            {getInput(type, defaultValue, name, formData, setFormData, autoFocus)}
        </StyledWrapper>
    );
};

export default AddRowInput;