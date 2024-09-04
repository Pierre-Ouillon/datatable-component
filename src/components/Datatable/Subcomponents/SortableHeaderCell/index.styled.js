import styled from 'styled-components';
import {StyledHeaderCell} from '../Header/index.styled';

export const StyledSortableHeaderCell = styled(StyledHeaderCell)`
    cursor: ${props => props.$sortState ? "pointer" : "default"};
`;

export const StyledLabel = styled.div`
    width: calc(100% - 24px);
`;