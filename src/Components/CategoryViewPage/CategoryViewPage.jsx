import React, { useState } from 'react';
import HeaderContent from '../HeaderContent/HeaderContent';
import './CategoryViewPage.css';
import NoneScroller from '../NoneScroller/NoneScroller';

function CategoryViewPage() {
    const districts = [
        'Colombo', 'Galle', 'Kandy', 'Matara', 'Jaffna', 'Hambantota',
        'Kurunegala', 'Anuradhapura', 'Polonnaruwa', 'Gampaha',
        'Kalutara', 'Ratnapura', 'Nuwara Eliya', 'Badulla', 'Trincomalee',
        'Batticaloa', 'Ampara', 'Puttalam', 'Moneragala', 'Vavuniya',
        'Kilinochchi', 'Mullaitivu', 'Mannar', 'Kegalle', 'Matale'
    ];

    const categories = {
        'Real Estate': ['House', 'Land', 'Apartment'],
        'Electronics': ['Phone', 'Laptop', 'Tablet'],
        'Tools & Equipment': ['Hammer', 'Drill', 'Saw'],
        'Fashion & Accessories': ['Clothes', 'Shoes', 'Accessories'],
        'Sports & Outdoors': ['Bicycle', 'Tennis Racket', 'Backpack'],
        'Event Supplies': ['Chairs', 'Tents', 'Tables'],
        'Books & Educational Material': ['Book', 'Notebook', 'Stationery'],
    };

    const deliveryMethods = ['Shipping', 'Free-Shipping', 'Pickup'];
    const conditions = ['Like-New', 'Used'];

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [searchText, setSearchText] = useState('');

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategories([]);
    };

    const handleSubcategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSubcategories([...selectedSubcategories, value]);
        } else {
            setSelectedSubcategories(
                selectedSubcategories.filter((subcategory) => subcategory !== value)
            );
        }
    };

    const handleDeliveryMethodChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedDeliveryMethods([...selectedDeliveryMethods, value]);
        } else {
            setSelectedDeliveryMethods(
                selectedDeliveryMethods.filter((method) => method !== value)
            );
        }
    };

    const handleConditionChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedConditions([...selectedConditions, value]);
        } else {
            setSelectedConditions(
                selectedConditions.filter((condition) => condition !== value)
            );
        }
    };

    const removeSelectedItem = (item, type) => {
        if (type === 'subcategory') {
            setSelectedSubcategories(selectedSubcategories.filter((subcategory) => subcategory !== item));
        } else if (type === 'deliveryMethod') {
            setSelectedDeliveryMethods(selectedDeliveryMethods.filter((method) => method !== item));
        } else if (type === 'condition') {
            setSelectedConditions(selectedConditions.filter((condition) => condition !== item));
        }
    };

    return (
        <>
            <HeaderContent />

            <div className="categoryViewPageContainer">
                <div className="CategoryViewPageSearchBarContainer">
                    <div className="CategoryViewPageSearchBar">
                        <div className="CategoryViewPageSearchText">
                            <input
                                id='searchText'
                                type="text"
                                placeholder="Search for anything"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="CategoryViewPageSearchButton">
                            <button type="button">Search</button>
                        </div>
                    </div>
                </div>

                <div className="categoryViewPageBodyContainer">
                    <div className="CategoryViewPageLeftDiv">
                        {/* Location Filter */}
                        <div className="locationChooseContainer">
                            <h3>Choose your location</h3>
                            <select value={selectedDistrict} onChange={handleDistrictChange}>
                                <option value="">Select Location</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div className="categoryChooseContainer">
                            <h3>Choose your Category</h3>
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                {Object.keys(categories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory Checkboxes */}
                        {selectedCategory && (
                            <div className="subCategoryViewContainer">
                                <h3>Rent by Sub-Category</h3>
                                {categories[selectedCategory].map((subcategory) => (
                                    <div key={subcategory} className='checkBoxDiv'>
                                        <input
                                            type="checkbox"
                                            id={subcategory}
                                            value={subcategory}
                                            checked={selectedSubcategories.includes(subcategory)}
                                            onChange={handleSubcategoryChange}
                                        />
                                        <label htmlFor={subcategory}>{subcategory}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Delivery Method Checkboxes */}
                        <div className="deliveryMethodViewContainer">
                            <h3>Rent by Delivery-Method</h3>
                            {deliveryMethods.map((method) => (
                                <div key={method} className='checkBoxDiv'>
                                    <input
                                        type="checkbox"
                                        id={method}
                                        value={method}
                                        checked={selectedDeliveryMethods.includes(method)}
                                        onChange={handleDeliveryMethodChange}
                                    />
                                    <label htmlFor={method}>{method}</label>
                                </div>
                            ))}
                        </div>

                        {/* Conditions Checkboxes */}
                        <div className="conditionsViewContainer">
                            <h3>Rent by Conditions</h3>
                            {conditions.map((condition) => (
                                <div key={condition} className='checkBoxDiv'>
                                    <input
                                        type="checkbox"
                                        id={condition}
                                        value={condition}
                                        checked={selectedConditions.includes(condition)}
                                        onChange={handleConditionChange}
                                    />
                                    <label htmlFor={condition}>{condition}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="CategoryViewPageRightDiv">
                        {/* Selected Items (Subcategories, Delivery Methods, Conditions) */}
                        {(selectedSubcategories.length > 0 || selectedDeliveryMethods.length > 0 || selectedConditions.length > 0) && (
                            <div className="selectedItemsViewContainer">
                                <div className="selected-items">
                                    {selectedSubcategories.map((subcategory) => (
                                        <div key={subcategory} className="selected-item">
                                            {subcategory}
                                            <button onClick={() => removeSelectedItem(subcategory, 'subcategory')}>✖</button>
                                        </div>
                                    ))}
                                    {selectedDeliveryMethods.map((method) => (
                                        <div key={method} className="selected-item">
                                            {method}
                                            <button onClick={() => removeSelectedItem(method, 'deliveryMethod')}>✖</button>
                                        </div>
                                    ))}
                                    {selectedConditions.map((condition) => (
                                        <div key={condition} className="selected-item">
                                            {condition}
                                            <button onClick={() => removeSelectedItem(condition, 'condition')}>✖</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="itemViewContainer">
                            <NoneScroller className='nonScrollerWrapper'>
                                <div className="itemBox">
                                    Sample Card
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                                <div className="itemBox">
                                    <p>Sample Card</p>
                                </div>
                            </NoneScroller>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryViewPage;
