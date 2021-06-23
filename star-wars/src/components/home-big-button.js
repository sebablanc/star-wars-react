import React from 'react';

function HomeBigButton({ownClass, label, value, callback}){
    return (
        <div className={ownClass} onClick={()=>{callback(value)}}>
            <div className="text-button">{label}</div>
        </div>
    );
}

export default HomeBigButton;