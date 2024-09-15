import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';


function SearchBar({ onSearch }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSelectChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const getSelectStyle = (selectedValue) => {
        return selectedValue === '' ? { color: '#A5A5A5' } : { color: '#333' };
    };

    const handleSearchClick = () => {
        navigate('/CategoryViewPage', {
            state: {
                category: selectedCategory,
                district: selectedDistrict,
                text: searchText
            }
        });
    };

    return (
        <>
            <div className="searchBarContainer">
                <div className="textSearch">
                    <input
                        id='searchText'
                        type="text"
                        placeholder="Search for anything"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="categorySearch">
                    <select
                        name="category"
                        value={selectedCategory}
                        onChange={handleSelectChange(setSelectedCategory)}
                        style={getSelectStyle(selectedCategory)}
                    >
                        <option value="">Category</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Tools & Equipment">Tools & Equipment</option>
                        <option value="Fashion & Accessories">Fashion & Accessories</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                        <option value="Event Supplies">Event Supplies</option>
                        <option value="Books & Educational Material">Books & Educational Material</option>
                        <option value="Vehicles">Vehicles</option>
                    </select>
                </div>

                <div className="locationSearch">
                    <select
                        name="userDistrict"
                        value={selectedDistrict}
                        onChange={handleSelectChange(setSelectedDistrict)}
                        style={getSelectStyle(selectedDistrict)}
                    >
                        <option value="">Location</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Matara">Matara</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Vavuniya">Vavuniya</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Mullaitivu">Mullaitivu</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Galle">Galle</option>
                        <option value="Kegalle">Kegalle</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                        <option value="Matale">Matale</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Jaffna">Jaffna</option>
                    </select>
                </div>

                <div className="searchButton">
                <button type="button" onClick={handleSearchClick}>Search</button>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
