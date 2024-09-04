import React from 'react';
import PropTypes from 'prop-types'
import { StyledWrapper, StyledLabel } from './index.styled';
import Input from '../Input';

const AddRowInput = ({label, name, formData, setFormData, autoFocus}) => {
    const handleChange = (e) => {
        formData[name] = e.target.value;
        setFormData(formData);
    };
    return (
        <StyledWrapper>
            <StyledLabel>{label}</StyledLabel>
            <Input autoFocus={autoFocus} onChange={handleChange}></Input>
        </StyledWrapper>
    );
};

AddRowInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string
};

export default AddRowInput;