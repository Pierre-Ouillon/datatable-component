import { StyledButton } from '../../../../style';
import styled from 'styled-components';

export const StyledActionContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const StyledButtonAction = styled(StyledButton)`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: 5px;
`;

export const StyledImg = styled.img`
    max-width: 100%;
    vertical-align: middle;
`;
