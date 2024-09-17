import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/';
import ActionCell from '../ActionCell/';
import {StyledRow} from './index.styled';
import {RowContext} from '../../contexts/rowContext';
import { DatatableDispatchContext } from '../../contexts/DatatableContext';

const Row = ({fields, row, id}) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useContext(DatatableDispatchContext);

    let cellList = [];

    fields.forEach(e => {
        cellList.push(
            <Cell 
                key={e.name} 
                field={e} 
                value={(editMode ? row.data[e.name] : row.formattedData[e.name])} 
                editMode={editMode} 
                formData={formData} 
                setFormData={setFormData}
                >
            </Cell>);
    });

    const handleSubmit = () => {
        dispatch({type:'editRow', rowData:formData, rowId: id});
        setEditMode(false);
    };

    return (
        <RowContext.Provider value={id}>
            <StyledRow>
                {cellList}
                <ActionCell editMode={editMode} setEditMode={setEditMode} handleSubmit={handleSubmit}></ActionCell>
            </StyledRow>
        </RowContext.Provider>
    );
};

Row.propTypes = {
    row: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired
};

export default Row;