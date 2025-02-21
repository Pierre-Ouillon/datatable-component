import styled from 'styled-components';
import { StyledButton } from '../../../style';

export const StyledPopin = styled.div`
    width: 50%;
    background-color: white;
    position: fixed;
    top: 10vh;
    left: 25vw;
    border-radius: 5px;
    padding-bottom: 10px;
`;

export const StyledOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
    position: fixed;
    top: 0px;
    left: 0px;  
`;

export const StyledTitle = styled.h1`
    margin-bottom: 5px;
    margin-top: 0px;
    background: ${props => props.theme.popin_title_bg};
    font-size: 16px;
    color: ${props => props.theme.popin_title_font};
    padding: 2px 10px;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledTitleImg = styled.img`
    width: 14px;
    height: 14px;
    cursor: pointer;
`;

export const StyledHr = styled.hr`
  width: 80%;
  color: rgb(220, 220, 220);
`;

export const StyledButtonValid = styled(StyledButton)`
    margin: auto;
    display: block;
    padding: 0px 20px;
`;