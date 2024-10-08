import React, {useContext} from 'react';

import { StyledCell } from '../../../../style';
import {StyledActionContainer, StyledButtonAction, StyledImg} from './index.styled';
import { TextContext } from '../../contexts/textContext';
import {RowContext} from '../../contexts/rowContext';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';
import getIcon from '../../icons';

const ActionCell = ({editMode, setEditMode, handleSubmit}) => {
    const text = useContext(TextContext);
    const rowId = useContext(RowContext);
    const dispatch = useContext(DatatableDispatchContext);
    const srcCheck = getIcon("check");
    const srcXMark = getIcon("x_mark");
    const srcEdit = getIcon("edit");
    const srcDelete = getIcon("delete");
    
    return (
            <StyledCell>
                <StyledActionContainer>
                    {editMode ?
                        <>
                        <StyledButtonAction title={text.actionCellSubmitTitle} onClick={handleSubmit}>
                            <StyledImg src={srcCheck} alt={text.actionCellSubmitTitle} />
                        </StyledButtonAction>
                        <StyledButtonAction title={text.actionCellCancelTitle} onClick={() => setEditMode(false)}>
                            <StyledImg src={srcXMark} alt={text.actionCellCancelTitle} />
                        </StyledButtonAction>
                        </>
                    :
                        <StyledButtonAction title={text.actionCellEditTitle} onClick={() => setEditMode(true)}>
                            <StyledImg src={srcEdit} alt={text.actionCellEditTitle} />
                        </StyledButtonAction>
                    }
                    <StyledButtonAction title={text.actionCellDeleteTitle} onClick={() => dispatch({type: 'deleteRow', rowId: rowId})}>
                        <StyledImg src={srcDelete} alt={text.actionCellDeleteTitle} />
                    </StyledButtonAction>
                </StyledActionContainer>
            </StyledCell>
            );
};

export default ActionCell;
