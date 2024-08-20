import React from 'react';

function ConditionField({ handleInputChange }) {
    return (
        <>
            <div className="conditionFieldContainer">
                <label htmlFor="condition">Condition</label>
                <select name="condition" onChange={handleInputChange} required>
                    <option value="">Select Condition</option>
                    <option value="used">Used</option>
                    <option value="like-new">Like New</option>
                </select>
            </div>
        </>
    );
}

export default ConditionField;
