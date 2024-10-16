import styled from 'styled-components';

export const StyledContainer = styled.div`
    width: calc(100% - 20px);
    margin: 10px;
`;

export const StyledTable = styled.table`
    width: 100%;
    border: ${props => props.theme.table_border};
    text-align: center;
    border-collapse: collapse;
`;

export const StyledDateTimeContainer = styled.div`
    display: flex;
`;