import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: white;
    cursor: pointer;
    border: 1px solid gray;
    border-radius: 3px;
    line-height: 20px;
    &:hover{
        background-color: rgb(233,233,233);
    }
    &:disabled{
        background-color: rgb(240,240,240);
        cursor: default;
    }
`;

export const StyledFlexDiv = styled.div`
    display: flex;
`;