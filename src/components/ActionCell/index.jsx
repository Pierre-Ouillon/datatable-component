import {React, useContext} from 'react';
import {StyledCell, StyledButton, StyledImg} from './index.styled';
import editIcon from '../../assets/images/icon_edit.png';
import checkIcon from '../../assets/images/icon_check_black.png';
import xMarkIcon from '../../assets/images/icon_x_mark_black.png';
import deleteIcon from '../../assets/images/icon_delete.png';
import {RowContext} from '../../contexts/rowContext';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';

const ActionCell = ({editMode, setEditMode, handleSubmit}) => {
    const rowId = useContext(RowContext);
    const dispatch = useContext(DatatableDispatchContext);
    
    return (
            <StyledCell>
                {editMode ?
                    <>
                    <StyledButton onClick={handleSubmit}><StyledImg src={checkIcon} /></StyledButton>
                    <StyledButton onClick={() => setEditMode(false)}><StyledImg src={xMarkIcon} /></StyledButton>
                    </>
                :
                    <StyledButton onClick={() => setEditMode(true)}><StyledImg src={editIcon} /></StyledButton>
                }
                <StyledButton onClick={() => dispatch({type: 'deleteRow', rowId: rowId})}><StyledImg src={deleteIcon} /></StyledButton>
            </StyledCell>
            );
};

export default ActionCell;
