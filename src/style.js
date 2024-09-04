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

export const StyledContainer = styled.div`
    width: calc(100% - 20px);
    margin: 10px;
`;

export const StyledTable = styled.table`
    width: 100%;
    border: 1px solid rgb(210, 210, 210);
    text-align: center;
    border-collapse: collapse;
`;

export const StyledButtonAdd = styled(StyledButton)`
    float: right;
`;

export const StyledImgContainer = styled.div`
    display: inline-block;
    border: 1px solid gray;
    width: 14px;
    height: 20px;
    border-radius: 50%;
    padding: 1px 4px;
    margin-left: 2px;
`;

export const StyledImg = styled.img`
    max-width: 100%;
    vertical-align: middle;
`;
