import styled from 'styled-components';

export const StyledRow = styled.tr`
    &:nth-child(2n){
        background: ${props => props.theme.body_bg_even};
        color: ${props => props.theme.body_font_even};
    }
    &:nth-child(2n+1){
        background: ${props => props.theme.body_bg_odd};
        color: ${props => props.theme.body_font_odd};
    }
`;