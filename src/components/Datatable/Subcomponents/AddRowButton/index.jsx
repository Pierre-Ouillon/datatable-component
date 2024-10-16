import React, { useContext } from "react";
import getIcon from "../../icons";
import { StyledButtonAdd, StyledImgContainer, StyledImg } from "./index.styled";
import { TextContext } from "../../contexts/textContext";

const AddRowButton = ({setPopinDisplayed}) => {
    const src = getIcon("plus");
    const text = useContext(TextContext);
    
    return (<StyledButtonAdd onClick={() => setPopinDisplayed(true)}>
    {text.addRowButton}
    <StyledImgContainer><StyledImg src={src} alt="Icon plus"></StyledImg></StyledImgContainer>
</StyledButtonAdd>)
};

export default AddRowButton;