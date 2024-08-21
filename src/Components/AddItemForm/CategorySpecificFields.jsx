import React, { useState } from 'react';
import './CategorySpecificFields.css';

function CategorySpecificFields({ category, handleInputChange }) {
    const [selectedOptions, setSelectedOptions] = useState({
        amenities: [],
        furnishingStatus: [],
        petPolicy: [],
        fuelType: [],
        transmissionType: [],
        accessoriesIncluded: [],
        rentingMethod: [],
        powerSource: [],
        color: [],
        occasion: [],
        subjectTopic: []
    });

    const [additionalColors, setAdditionalColors] = useState([]);
    const [additionalSubjects, setAdditionalSubjects] = useState([]);

    const handleAddField = (field) => {
        if (field === 'color') {
            setAdditionalColors([...additionalColors, '']);
        } else if (field === 'subjectTopic') {
            setAdditionalSubjects([...additionalSubjects, '']);
        }
    };

    const renderAdditionalFields = (field, additionalFields) => (
        additionalFields.map((fieldValue, index) => (
            <div key={index} className="subcategoryItem">
                <input
                    type="text"
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    placeholder={`Add ${field}`}
                />
            </div>
        ))
    );


    const handleFieldChange = (index, field, value) => {
        if (field === 'color') {
            const updatedColors = [...additionalColors];
            updatedColors[index] = value;
            setAdditionalColors(updatedColors);
        } else if (field === 'subjectTopic') {
            const updatedSubjects = [...additionalSubjects];
            updatedSubjects[index] = value;
            setAdditionalSubjects(updatedSubjects);
        }
    };


    const toggleOption = (field, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [field]: prevState[field].includes(option)
                ? prevState[field].filter(item => item !== option)
                : [...prevState[field], option]
        }));
    };

    const renderOptions = (options, field) => (
        options.map((option, index) => (
            <div
                key={index}
                className={`subcategoryItem ${selectedOptions[field].includes(option) ? 'selected' : ''}`}
                onClick={() => toggleOption(field, option)}
            >
                {option}
            </div>
        ))
    );

    const renderFieldsByCategory = () => {
        switch (category) {
            case 'real-estate':
                return (
                    <>
                        <div>
                            <label>Property Type:</label>
                            <input
                                type="text"
                                name="propertyType"
                                placeholder="e.g., House, Apartment"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Number of Bedrooms:</label>
                            <input
                                type="number"
                                name="bedrooms"
                                placeholder="e.g., 3"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Number of Bathrooms:</label>
                            <input
                                type="number"
                                name="bathrooms"
                                placeholder="e.g., 2"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Square Footage:</label>
                            <input
                                type="number"
                                name="squareFootage"
                                placeholder="e.g., 1200"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Amenities:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Pool', 'Gym', 'Parking'], 'amenities')}
                            </div>
                        </div>
                        <div>
                            <label>Furnishing Status:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Furnished', 'Unfurnished'], 'furnishingStatus')}
                            </div>
                        </div>
                        <div>
                            <label>Pet Policy:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Pets Allowed', 'Not allowed'], 'petPolicy')}
                            </div>
                        </div>
                    </>
                );
            case 'vehicles':
                return (
                    <>
                        <div>
                            <label>Vehicle Type:</label>
                            <input
                                type="text"
                                name="vehicleType"
                                placeholder="e.g., Car, Bike"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Make/Model:</label>
                            <input
                                type="text"
                                name="makeModel"
                                placeholder="e.g., Toyota Corolla"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Year:</label>
                            <input
                                type="number"
                                name="year"
                                placeholder="e.g., 2020"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Mileage:</label>
                            <input
                                type="number"
                                name="mileage"
                                placeholder="e.g., 20000"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Fuel Type:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Petrol', 'Diesel', 'Electric'], 'fuelType')}
                            </div>
                        </div>
                        <div>
                            <label>Transmission Type:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Automatic', 'Manual'], 'transmissionType')}
                            </div>
                        </div>
                        <div>
                            <label>Seating Capacity:</label>
                            <input
                                type="number"
                                name="seatingCapacity"
                                placeholder="e.g., 5"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Insurance Included?</label>
                            <input
                                type="checkbox"
                                name="insuranceIncluded"
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                );
            case 'electronics':
                return (
                    <>
                        <div>
                            <label>Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="e.g., Sony"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Model:</label>
                            <input
                                type="text"
                                name="model"
                                placeholder="e.g., Alpha 7"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Technical Specifications:</label>
                            <input
                                type="text"
                                name="technicalSpecifications"
                                placeholder="e.g., 24.2MP, 4K Video"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Accessories Included:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Lenses', 'Batteries', 'Tripods'], 'accessoriesIncluded')}
                            </div>
                        </div>
                        <div>
                            <label>Renting Method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );
            case 'tools-equipment':
                return (
                    <>
                        <div>
                            <label>Type of Tool/Equipment:</label>
                            <input
                                type="text"
                                name="toolType"
                                placeholder="e.g., Drill, Saw"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Power Source:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Electric', 'Gas', 'Battery'], 'powerSource')}
                            </div>
                        </div>
                        <div>
                            <label>Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="e.g., DeWalt"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Model:</label>
                            <input
                                type="text"
                                name="model"
                                placeholder="e.g., DCD771C2"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Safety Instructions:</label>
                            <input
                                type="text"
                                name="safetyInstructions"
                                placeholder="e.g., Wear protective gear"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Renting Method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );
            case 'fashion-accessories':
                return (
                    <>
                        <div>
                            <label>Size:</label>
                            <input
                                type="text"
                                name="size"
                                placeholder="e.g., M, L, XL"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Color:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Red', 'Green'], 'color')}
                                {renderAdditionalFields('color', additionalColors)}
                                <button onClick={() => handleAddField('color')}>Add More Colors</button>
                            </div>
                        </div>
                        <div>
                            <label>Material:</label>
                            <input
                                type="text"
                                name="material"
                                placeholder="e.g., Cotton, Leather"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Designer/Brand:</label>
                            <input
                                type="text"
                                name="designerBrand"
                                placeholder="e.g., Gucci"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Occasion:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Formal', 'Casual', 'Party'], 'occasion')}
                            </div>
                        </div>
                        <div>
                            <label>Renting Method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );
            case 'sports-outdoors':
                return (
                    <>
                        <div>
                            <label>Type of Equipment:</label>
                            <input
                                type="text"
                                name="equipmentType"
                                placeholder="e.g., Tent, Kayak"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Brand:</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="e.g., Nike"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Size/Capacity:</label>
                            <input
                                type="text"
                                name="sizeCapacity"
                                placeholder="e.g., Large, 5L"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Weight Limit:</label>
                            <input
                                type="text"
                                name="weightLimit"
                                placeholder="e.g., 200 lbs"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Safety Instructions:</label>
                            <input
                                type="text"
                                name="safetyInstructions"
                                placeholder="e.g., Wear a helmet"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Renting method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );

            case 'event-supplies':
                return (
                    <>
                        <div>
                            <label>Size/Dimensions:</label>
                            <input
                                type="text"
                                name="sizeDimensions"
                                placeholder="e.g., 10x10 ft"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Material:</label>
                            <input
                                type="text"
                                name="material"
                                placeholder="e.g., Plastic, Wood"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Capacity:</label>
                            <input
                                type="number"
                                name="capacity"
                                placeholder="e.g., 100 people"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Setup Instructions:</label>
                            <input
                                type="text"
                                name="setupInstructions"
                                placeholder="e.g., Requires 2 people"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Renting method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );

            case 'books-educational':
                return (
                    <>
                        <div>
                            <label>Author:</label>
                            <input
                                type="text"
                                name="author"
                                placeholder="e.g., J.K. Rowling"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Edition:</label>
                            <input
                                type="text"
                                name="edition"
                                placeholder="e.g., 2nd Edition"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>ISBN:</label>
                            <input
                                type="text"
                                name="isbn"
                                placeholder="e.g., 978-3-16-148410-0"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Condition:</label>
                            <input
                                type="text"
                                name="condition"
                                placeholder="New, Used"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Subject/Topic:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Science', 'Literature'], 'subjectTopic')}
                                {renderAdditionalFields('subjectTopic', additionalSubjects)}
                                <button onClick={() => handleAddField('subjectTopic')}>Add More Subjects</button>
                            </div>
                        </div>
                        <div>
                            <label>Renting method:</label>
                            <div className="subcategoryContainer">
                                {renderOptions(['Delivery', 'Pickup'], 'rentingMethod')}
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return <div className='subCategoryContainerMain'>{renderFieldsByCategory()}</div>;
}

export default CategorySpecificFields;
