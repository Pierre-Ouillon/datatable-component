import styled from 'styled-components';
import { StyledButton } from '../../../style';

export const StyledFooterButton = styled(StyledButton)`
    line-height: normal;
    display: flex;
`;

export const StyledFooter = styled.div`
    display: flex;
    justify-content: center;
    border: ${props => props.theme.table_border};
    text-align: center;
`;