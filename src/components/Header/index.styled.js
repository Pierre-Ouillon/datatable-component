import styled from 'styled-components';

export const StyledHeader = styled.thead`
    background-color: rgb(0, 0, 0);
`;

export const StyledHeaderCell = styled.th`
    padding: 5px;
    font-weight: bold;
    color: white;
    border-left: 2px solid white;
    &:first-child{
        border-left: none;
    }
`;

