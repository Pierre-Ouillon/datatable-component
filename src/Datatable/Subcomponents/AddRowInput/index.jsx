import React from 'react';
import PropTypes from 'prop-types'
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