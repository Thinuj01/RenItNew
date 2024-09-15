import React from 'react';

function ConditionField({ setFormData,formData }) {
    return (
        <>
            <div className="conditionFieldContainer">
                <label htmlFor="condition">Condition</label>
                <select name="condition" onChange={setFormData} value={formData.condition||""} required>
                    <option value="">Select Condition</option>
                    <option value="used">Used</option>
                    <option value="like-new">Like New</option>
                </select>
            </div>
        </>
    );
}

export default ConditionField;
