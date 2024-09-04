import styled from 'styled-components';
import { StyledButton } from '../../style';

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

export const StyledImg = styled.img`
    max-width: 100%;
    vertical-align: middle;
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