import React from 'react';
import './RentalPriceForm.css'

function RentalPriceForm({
    basePricePerDay,
    lateReturnFeePerDay,
    pricingModifiers,
    handleBasePriceChange,
    handleLateFeeChange,
    handleModifierChange,
    addPricingModifier,
    removePricingModifier,
    calculatePrice
}) {
    return (
        <>
            <div className="RentalPriceFormContainer">

                <h3>Rental Pricing</h3>

                <div className="rental-pricing-form">
                    <div className="form-group">
                        <label htmlFor="basePricePerDay">Base Price per Day:</label>
                        <input
                            type="number"
                            id="basePricePerDay"
                            value={basePricePerDay}
                            onChange={handleBasePriceChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lateReturnFeePerDay">Late Return Fee per Day:</label>
                        <input
                            type="number"
                            id="lateReturnFeePerDay"
                            value={lateReturnFeePerDay}
                            onChange={handleLateFeeChange}
                            required
                        />
                    </div>

                    <div className="pricing-modifiers-section">
                        <label>Pricing Modifiers:</label>
                        {pricingModifiers.map((modifier, index) => (
                            <div
                                key={index}
                                className="modifier-item"
                            >
                                <input
                                    type="number"
                                    placeholder="Days"
                                    value={modifier.days}
                                    onChange={(e) => handleModifierChange(index, 'days', e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Multiplier (e.g., 0.9 for 10% off)"
                                    value={modifier.multiplier}
                                    onChange={(e) => handleModifierChange(index, 'multiplier', e.target.value)}
                                    required
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removePricingModifier(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        <div id="addModifierButton">
                            <button type="button" id='addModifierButton' onClick={addPricingModifier}>
                                Add Modifier
                            </button>
                        </div>
                    </div>

                    <div className="price-preview">
                        <h3>Price Preview:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rental Duration (Days)</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 3, 5, 7, 10, 14, 30].map((days) => (
                                    <tr key={days}>
                                        <td>{days} Day(s)</td>
                                        <td>${calculatePrice(days).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

export default RentalPriceForm;
