import React, { useState } from 'react';

import CommonFields from './CommonFields';
import ImageUpload from './ImageUpload';
import RentalPriceForm from './RentalPriceForm';
import ConditionField from './ConditionField';
import CategoryFields from './CategoryFields';
import CategorySpecificFields from './CategorySpecificFields';
import './AddItemForm.css';

function AddItemForm() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({});
    const [images, setImages] = useState([]);
    const [pricingModifiers, setPricingModifiers] = useState([{ days: '', multiplier: '' }]);
    const [basePricePerDay, setBasePricePerDay] = useState('');
    const [lateReturnFeePerDay, setLateReturnFeePerDay] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [pcode, setPcode] = useState('');
    const [paddress, setPaddress] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files].slice(0, 5)); // Limiting to 5 images
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleBasePriceChange = (e) => {
        setBasePricePerDay(e.target.value);
    };

    const handleLateFeeChange = (e) => {
        setLateReturnFeePerDay(e.target.value);
    };

    const handleModifierChange = (index, field, value) => {
        const newModifiers = [...pricingModifiers];
        newModifiers[index][field] = value;
        setPricingModifiers(newModifiers);
    };

    const addPricingModifier = () => {
        setPricingModifiers([...pricingModifiers, { days: '', multiplier: '' }]);
    };

    const removePricingModifier = (index) => {
        const newModifiers = pricingModifiers.filter((_, i) => i !== index);
        setPricingModifiers(newModifiers);
    };

    const calculatePrice = (days) => {
        const applicableModifiers = pricingModifiers
            .filter((mod) => mod.days !== '' && mod.multiplier !== '')
            .map((mod) => ({
                ...mod,
                days: parseInt(mod.days),
                multiplier: parseFloat(mod.multiplier),
            }))
            .sort((a, b) => a.days - b.days);

        let multiplier = 1;
        for (let mod of applicableModifiers) {
            if (days >= mod.days) {
                multiplier = mod.multiplier;
            } else {
                break;
            }
        }

        return basePricePerDay * days * multiplier;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSubmit = {
            ...formData,
            images,
            basePricePerDay,
            pricingModifiers,
            lateReturnFeePerDay,
        };
        console.log('Form Data:', formDataToSubmit);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <CommonFields
                            formData={formData}
                            onInputChange={handleInputChange}
                            setSelectedDistrict={setSelectedDistrict}
                            setPcode={setPcode}
                            setPaddress={setPaddress}
                        />
                        <ImageUpload
                            images={images}
                            handleImageChange={handleImageChange}
                            handleRemoveImage={handleRemoveImage}
                        />
                    </div>
                );
            case 2:
                return <RentalPriceForm
                    basePricePerDay={basePricePerDay}
                    lateReturnFeePerDay={lateReturnFeePerDay}
                    pricingModifiers={pricingModifiers}
                    handleBasePriceChange={handleBasePriceChange}
                    handleLateFeeChange={handleLateFeeChange}
                    handleModifierChange={handleModifierChange}
                    addPricingModifier={addPricingModifier}
                    removePricingModifier={removePricingModifier}
                    calculatePrice={calculatePrice}
                />;
            case 3:
                return (
                    <div>
                        <ConditionField
                            onInputChange={handleInputChange}
                        />
                        <CategoryFields
                            category={category}
                            handleCategoryChange={handleCategoryChange}
                            onInputChange={handleInputChange}
                        />
                    </div>
                );
            case 4:
                return <CategorySpecificFields
                    category={category}
                    onInputChange={handleInputChange}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="addItemFormContainer">
            <div className="addItemHeader">
                <h1>Add Item</h1>
                <p>Fill this form correctly to Add Item</p>
            </div>

            <div className="addItemForm">
                <form onSubmit={handleSubmit}>
                    {renderStepContent()}
                    <div className="navigation-buttons">
                        {step > 1 && (
                            <button type="button" onClick={() => setStep(step - 1)}>
                                Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button type="button" onClick={() => setStep(step + 1)}>
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="submit-btn">Submit</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemForm;
