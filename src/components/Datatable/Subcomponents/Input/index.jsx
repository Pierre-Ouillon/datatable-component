import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './index.styled';

const Input = ({initialValue = "", width = "calc(100% - 8px)", onChange = () => {}, ...props}) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e);
    }
    return <StyledInput {...props} value={value} onChange={handleChange} width={width} ></StyledInput>
};

Input.propTypes = {
    initialValue: PropTypes.any,
    onChange: PropTypes.func
}

export default Input;