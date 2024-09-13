import React, { useEffect, useState } from 'react';
import HeaderContent from '../HeaderContent/HeaderContent';
import './CategoryViewPage.css';
import NoneScroller from '../NoneScroller/NoneScroller';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function CategoryViewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cate = decodeURIComponent(queryParams.get('category') || '');
    const { category, district, text } = location.state || {};
    
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
        'Vehicles': ['Car', 'Van', 'Motor Bike', 'Truck', 'Bus'],
    };

    const deliveryMethods = ['Shipping', 'Pickup'];
    const conditions = ['New', 'LikedNew', 'Used'];

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [searchText, setSearchText] = useState(text || '');
    const [paths, setPaths] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());  // Convert to lowercase for case-insensitive search
    };

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

    useEffect(() => {
        // Only set selectedCategory if it's not already set or if "cate" is valid
        if (cate && selectedCategory !== cate) {
            setSelectedCategory(cate);
            console.log("Category set to:", cate);
        } else if ((category || district || text) && !selectedCategory) {
            // Only update selectedCategory and other states if they aren't already set
            if (category) {
                setSelectedCategory(category);
            }
            if (district) {
                setSelectedDistrict(district);
            }
            if (text) {
                setSearchText(text);
            }
        }
    }, [cate, category, district, text]); // Add dependencies to trigger when these values change
    

    useEffect(() => {
        if (!selectedCategory) return;  // Don't fetch if no category is selected
    
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:80/RentIT/Controllers/showItemsController.php', {
                    params: { param: selectedCategory }
                });
                setPaths(response.data);
                console.log(response.data);
                console.log("Current state:", selectedCategory, category, district, text, cate);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
    
        fetchData(); // Call the async function
    }, [selectedCategory]); // Only fetch when selectedCategory changes
    
    

    

    
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
                                onChange={handleSearchChange}
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
                        {selectedCategory !== 'Real Estate' ? (
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
                        ):(
                            null
                        )}
                        

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

                        <div>
                            <h1>Category: {selectedCategory}</h1>
                        </div>

                        <div className="itemViewContainer">
                            <NoneScroller className='nonScrollerWrapper'>
                                
                            {Array.isArray(paths) && paths.length > 0 ? (
    paths.filter((image) => {
        // Check if search term matches (empty search term should show all items)
        const matchesSearch = searchText === '' || 
            image.title.toLowerCase().includes(searchText) || 
            image.description.toLowerCase().includes(searchText);

        // Check if subcategories match (show all if none are selected)
        const matchesSubcategory = selectedSubcategories.length === 0 || 
            image.subcategories.some(subcategory => selectedSubcategories.includes(subcategory));

        // Check if conditions match (show all if none are selected)
        const matchesCondition = selectedConditions.length === 0 ||
            selectedConditions.includes(image.item_condition);

        // Return items that match all filters (search, subcategory, and condition)
        return matchesSearch && matchesSubcategory && matchesCondition;
    }).length === 0 ? (
        <div>No items found</div> // Display message if no items match the filter
    ) : (
        paths.filter((image, index) => {
            // Apply the same filtering logic again
            const matchesSearch = searchText === '' || 
                image.title.toLowerCase().includes(searchText) || 
                image.description.toLowerCase().includes(searchText);

            const matchesSubcategory = selectedSubcategories.length === 0 || 
                image.subcategories.some(subcategory => selectedSubcategories.includes(subcategory));

            const matchesCondition = selectedConditions.length === 0 ||
                selectedConditions.includes(image.item_condition);

            return matchesSearch && matchesSubcategory && matchesCondition;
        }).map((image, index) => (
            <div key={index} className="itemBox">
                <img src={'http://localhost:80/RentIT' + image.item_Picture_01} width='100px' alt={`Item ${index}`} />
            </div>
        ))
    )
) : (
    <div>No items found</div> // Display this message if paths is not an array or is empty
)}


       
                            </NoneScroller>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryViewPage;
