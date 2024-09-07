import React, { useState } from 'react';
import './CategoryFields.css';

const categorySubcategories = {
    'real-estate': ['Apartments', 'Houses', 'Land', 'Commercial'],
    'vehicles': ['Cars', 'Motorcycles', 'Trucks', 'Bicycles'],
    'electronics': ['Phones', 'Computers', 'Cameras', 'TVs'],
    'tools-equipment': ['Hand Tools', 'Power Tools', 'Gardening Tools'],
    'fashion-accessories': ['Clothing', 'Jewelry', 'Shoes', 'Bags'],
    'sports-outdoors': ['Sports Equipment', 'Camping Gear', 'Outdoor Clothing'],
    'event-supplies': ['Decorations', 'Lighting', 'Audio Equipment'],
    'books-educational': ['Textbooks', 'Novels', 'Educational Toys', 'Stationery'],
};

function CategoryFields({ category, handleCategoryChange ,selectedSubcategories,setSelectedSubcategories}) {
    const [subcategories, setSubcategories] = useState([]);


    const handleCategorySelect = (e) => {
        const selectedCategory = e.target.value;
        handleCategoryChange(e);
        setSubcategories(categorySubcategories[selectedCategory] || []);
        setSelectedSubcategories([]);
    };

    const toggleSubcategory = (subcategory) => {
        setSelectedSubcategories((prevSelected) => {
            if (prevSelected.includes(subcategory)) {
                return prevSelected.filter((item) => item !== subcategory);
            } else {
                return [...prevSelected, subcategory];
            }
        });
    };

    return (
        <div className="categoryFieldContainer">
            <div className="selectCategoryDiv">
                <label htmlFor='category'>Select Category</label>
                <select
                    name="category"
                    value={category}
                    onChange={handleCategorySelect}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="electronics">Electronics</option>
                    <option value="tools-equipment">Tools & Equipment</option>
                    <option value="fashion-accessories">Fashion & Accessories</option>
                    <option value="sports-outdoors">Sports & Outdoors</option>
                    <option value="event-supplies">Event Supplies</option>
                    <option value="books-educational">Books & Educational Material</option>
                </select>
            </div>

            {subcategories.length > 0 && (
                <div className="selectSubCategories">
                    <label>Select Subcategories</label>
                    <div className="subcategoryContainer">
                        {subcategories.map((subcat, index) => (
                            <div
                                key={index}
                                className={`subcategoryItem ${selectedSubcategories.includes(subcat) ? 'selected' : ''}`}
                                onClick={() => toggleSubcategory(subcat)}
                            >
                                {subcat}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryFields;
