import styled from 'styled-components';

export const StyledButton = styled.button`
    background: ${props => props.theme.button_bg};
    cursor: pointer;
    border: ${props => props.theme.button_border};
    color: ${props => props.theme.button_font};
    border-radius: 3px;
    line-height: 20px;
    &:hover{
        background: ${props => props.theme.button_bg_hover};
    }
    &:disabled{
        background: ${props => props.theme.button_bg_disabled};
        cursor: default;
    }
`;

export const StyledFlexDiv = styled.div`
    display: flex;
`;

export const StyledCell = styled.td`
    padding: 3px;
    border: ${props => props.theme.cell_border};
`;

export const StyledHeaderCell = styled.th`
    padding: 5px;
    font-weight: bold;
    color: ${props => props.theme.header_font};
    border-left: ${props => props.theme.header_separator};
    vertical-align: top;
    &:first-child{
        border-left: none;
    }
`;