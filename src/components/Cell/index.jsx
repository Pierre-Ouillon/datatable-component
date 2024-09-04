import React from 'react';
import PropTypes from 'prop-types';
import {StyledCell} from './index.styled';
import Input from '../Input';

const Cell = ({field, value, editMode, formData, setFormData}) => {
    const handleChange = (e) => {
        formData[field] = e.target.value;
        setFormData(formData);
    };
    return (editMode ?
        <StyledCell><Input initialValue={value} onChange={handleChange}></Input></StyledCell>
        :
    <StyledCell>{value}</StyledCell>);
};

Cell.propTypes = {
    value: PropTypes.any.isRequired
};

export default Cell;