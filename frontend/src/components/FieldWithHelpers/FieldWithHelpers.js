import React from 'react';

const FieldWithHelpers = props => {    
  return (
    <div className="FielsWithHelpers">
      <input 
        className="text-field"
        type="number" 
        placeholder={props.placeholder}
        value={props.value || ''}
        onChange={(e)=>{
          props.handleChange(e.target.value);
          e.target.focus();
        }}
        key="FieldWithHelpers"
      />

      {Object.keys(props.helpers).map((key) => (
        <span
          onClick={(e)=>{
            const newVal = props.helpers[key];
            props.handleChange(newVal);
          }} 
          className={"text-field__helper "+(
            Number(props.helpers[key]) === Number(props.value) && "text-field__helper--active"
          )}
          key={props.helpers[key]}
        >
        {key}
        </span>
      ))}
    </div>
  )
}

export default FieldWithHelpers;