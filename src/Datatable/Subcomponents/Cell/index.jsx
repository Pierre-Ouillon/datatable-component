import React from 'react';
import PropTypes from 'prop-types';
import {StyledCell} from '../../../style';
import { getInput } from '../../utils';

const Cell = ({field, value, editMode, formData, setFormData, autoFocus}) => {
    return (editMode ?
        <StyledCell>{getInput(field.type, value, field.name, formData, setFormData, autoFocus)}</StyledCell>
        :
    <StyledCell>{value}</StyledCell>);
};

Cell.propTypes = {
    value: PropTypes.any.isRequired
};

export default Cell;