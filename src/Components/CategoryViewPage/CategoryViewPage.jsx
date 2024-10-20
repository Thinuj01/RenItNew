import React, { useEffect, useState } from 'react';
import HeaderContent from '../HeaderContent/HeaderContent';
import './CategoryViewPage.css';
import NoneScroller from '../NoneScroller/NoneScroller';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';

function CategoryViewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const cate = decodeURIComponent(queryParams.get('category') || '');
    const { category, district, text } = location.state || {};

    useEffect(() => {
        navigate(location.pathname, { replace: true });
      }, [location.pathname, navigate]);

    const item = {
        imageUrl: 'https://via.placeholder.com/250',
        name: 'Sample Item name in 2 lines visible',
        category: 'Electronics',
        subcategories: ['Smartphones', 'Accessories', 'Gadgets'], // Add subcategories here
        price: 99.99
      };
    const districts = [
        'Colombo', 'Galle', 'Kandy', 'Matara', 'Jaffna', 'Hambantota',
        'Kurunegala', 'Anuradhapura', 'Polonnaruwa', 'Gampaha',
        'Kalutara', 'Ratnapura', 'Nuwara Eliya', 'Badulla', 'Trincomalee',
        'Batticaloa', 'Ampara', 'Puttalam', 'Moneragala', 'Vavuniya',
        'Kilinochchi', 'Mullaitivu', 'Mannar', 'Kegalle', 'Matale'
    ];

    const categories = {
        'Real Estate': ['Apartment', 'House', 'Land', 'Commercial'],
        'Electronics': ['Phone', 'Laptop', 'Computer', 'Cameras', 'TVs'],
        'Tools & Equipment': ['Hammer', 'Drill', 'Saw'],
        'Fashion & Accessories': ['Clothes', 'Shoes', 'Accessories'],
        'Sports & Outdoors': ['Bicycle', 'Tennis Racket', 'Backpack'],
        'Event Supplies': ['Chairs', 'Tents', 'Tables'],
        'Books & Educational Material': ['Textbooks', 'Notebook', 'Novels', 'Educational Toys', 'Stationery'],
        'Vehicles': ['Car', 'Motor Bike', 'Truck', 'Van', 'Bus'],
    };

    const districtCoordinates = {
        "Ampara": { lat: 7.2839, lon: 81.6745 },
        "Anuradhapura": { lat: 8.3114, lon: 80.4037 },
        "Badulla": { lat: 6.9891, lon: 81.0551 },
        "Batticaloa": { lat: 7.7315, lon: 81.6745 },
        "Colombo": { lat: 6.9271, lon: 79.8612 },
        "Galle": { lat: 6.0535, lon: 80.2210 },
        "Gampaha": { lat: 7.0912, lon: 79.9985 },
        "Hambantota": { lat: 6.1246, lon: 81.1185 },
        "Jaffna": { lat: 9.6615, lon: 80.0255 },
        "Kalutara": { lat: 6.5854, lon: 79.9607 },
        "Kandy": { lat: 7.2906, lon: 80.6337 },
        "Kegalle": { lat: 7.2513, lon: 80.3465 },
        "Kilinochchi": { lat: 9.3803, lon: 80.3911 },
        "Kurunegala": { lat: 7.4863, lon: 80.3647 },
        "Mannar": { lat: 8.9813, lon: 79.9042 },
        "Matale": { lat: 7.4671, lon: 80.6234 },
        "Matara": { lat: 5.9485, lon: 80.5353 },
        "Monaragala": { lat: 6.8723, lon: 81.3443 },
        "Mullaitivu": { lat: 9.2673, lon: 80.8145 },
        "Nuwara Eliya": { lat: 6.9497, lon: 80.7891 },
        "Polonnaruwa": { lat: 7.9403, lon: 81.0188 },
        "Puttalam": { lat: 8.0362, lon: 79.8395 },
        "Ratnapura": { lat: 6.6828, lon: 80.3994 },
        "Trincomalee": { lat: 8.5874, lon: 81.2152 },
        "Vavuniya": { lat: 8.7514, lon: 80.4976 }
      };

    const deliveryMethods = ['Delivery', 'Pickup'];
    const conditions = ['New', 'like-new', 'Used'];

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

    function haversineDistance(coords1, coords2) {
        //   if (!coords1 || !coords2 || !coords1.lat || !coords2.lat || !coords1.lng || !coords2.lng) {
        //         console.error("Location data is incomplete:", coords1, coords2);
        //         return 0;
        //     }
        const toRad = (value) => value * Math.PI / 180;
        
        const R = 6371; 
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLon = toRad(coords2.lon - coords1.lon);
        
        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
          
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }

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
                    params: { param: selectedCategory, status: "1" },
                    withCredentials:true
                });
                setPaths(response.data);
                setSelectedDistrict(response.data.user_district);
                console.log(response.data);
                console.log("Current state:", selectedCategory, category, district, text, cate);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchData(); // Call the async function
    }, [selectedCategory]); // Only fetch when selectedCategory changes

    useEffect(() => {
        const fetchRatings = async () => {
          const updatedPaths = await Promise.all(
            paths.map(async (path) => {
              try {
                const response = await axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
                  params: { itemId: path.item_id, status: "3" },
                  withCredentials: true
                });
                return { ...path, rating: response.data };
              } catch (error) {
                console.error('There was an error fetching rating', error);
                return path;
              }
            })
          );
          setPaths(updatedPaths);
        };
      
        if (paths.length > 0) {
          fetchRatings();
        }
      }, [paths]);

    
    const userCoordinates = districtCoordinates[selectedDistrict];
    
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
                        {selectedCategory !== 'Real Estate' && selectedCategory !== 'Vehicles' ? (
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
                        ) : (
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
                                    <div>
                                        <h1>Category: {selectedCategory}</h1>
                                    </div>
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
                            <NoneScroller className='nonScrollerWrapperFiveColumn'>
                                
                            {Array.isArray(paths) && paths.length > 0 ? (
                                // First filter the paths according to the conditions
                                paths.filter((image) => {
                                    const matchesSearch = searchText === '' ||
                                        image.title.toLowerCase().includes(searchText) ||
                                        image.description.toLowerCase().includes(searchText);

                                    const matchesSubcategory = selectedSubcategories.length === 0 ||
                                        image.subcategories.some(subcategory => selectedSubcategories.includes(subcategory));

                                    const matchesCondition = selectedConditions.length === 0 ||
                                        selectedConditions.includes(image.item_condition);

                                    const matchesRentingmethod = selectedDeliveryMethods.length === 0 ||
                                        selectedDeliveryMethods.includes(image.renting_method);

                                    return matchesSearch && matchesSubcategory && matchesCondition && matchesRentingmethod;
                                })
                                // Sort only if userCoordinates are not empty
                                .sort((a, b) => {
                                    if (!userCoordinates || Object.keys(userCoordinates).length === 0) {
                                        return 0; // Do not sort, return 0 to keep original order
                                    }

                                    const itemCoordinatesA = districtCoordinates[a.district];
                                    const itemCoordinatesB = districtCoordinates[b.district];

                                    const distanceA = haversineDistance(userCoordinates, itemCoordinatesA);
                                    const distanceB = haversineDistance(userCoordinates, itemCoordinatesB);

                                    return distanceA - distanceB;
                                })
                                // Map the sorted items to the UI
                                .map((image, index) => (
                                    <ItemCard key={index} item={item} paths={image} navi="preview"/>
                                ))
                            ) : (
                                <div>No items found</div>
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
