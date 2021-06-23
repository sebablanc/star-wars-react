import React from 'react';
function SelectForm({label, list, callback}){
    return(
        <div className="form-data">
            <label htmlFor={label.toLowerCase()}>{label}: </label>
            
                <select className="selector input" name={label.toLowerCase()} onChange={(event)=>{callback(event)}}>
                    <option value="">-- Seleccione un valor --</option>
                    {list.map((item, index) => <option value={item}>{item.replace('_', ' ')}</option>)}
                </select>
        </div>
    );
}

export default SelectForm;