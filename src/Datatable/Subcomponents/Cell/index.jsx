import React from 'react';
import {StyledCell} from '../../../style';
import { getInput } from '../../utils';

const Cell = ({field, value, editMode, formData, setFormData, autoFocus}) => {
    return (editMode ?
        <StyledCell>{getInput(field.type, value, field.name, formData, setFormData, autoFocus)}</StyledCell>
        :
    <StyledCell>{value}</StyledCell>);
};

export default Cell;