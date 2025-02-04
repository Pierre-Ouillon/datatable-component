import styled from 'styled-components';
import { StyledButton } from '../../../style';

export const StyledButtonAdd = styled(StyledButton)`
    float: right;
`;

export const StyledImg = styled.img`
    max-width: 100%;
    vertical-align: middle;
`;

export const StyledImgContainer = styled.div`
    display: inline-block;
    border: ${props => props.theme.button_border};
    width: 14px;
    height: 20px;
    border-radius: 50%;
    padding: 1px 4px;
    margin-left: 2px;
`;