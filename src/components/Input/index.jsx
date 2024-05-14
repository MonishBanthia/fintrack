import React from 'react'
import './styles.css';
function Input({label , state , setState , placeholder , type}){
    return (
    <div className='input-wrapper'>
    <p className='input-label'>{label}</p>
    <input className='custom-input' 
    type={type}
    value={state}
    placeholder={placeholder}
    onChange={(e)=> setState(e.target.value)}

    />
    </div>);
}

export default Input;