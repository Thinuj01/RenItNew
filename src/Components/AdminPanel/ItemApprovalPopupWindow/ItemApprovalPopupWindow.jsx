import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemApprovalPopupWindow.css';

const ItemApprovalPopupWindow = ({ selectedRowData, onClose }) => {
    const imageArray = [
        'http://localhost:4433/RentIT/' + selectedRowData.item_Picture_01.slice(3),
        'http://localhost:4433/RentIT/' + selectedRowData.item_Picture_02.slice(3),
        'http://localhost:4433/RentIT/' + selectedRowData.item_Picture_03.slice(3),
        'http://localhost:4433/RentIT/' + selectedRowData.item_Picture_04.slice(3),
        'http://localhost:4433/RentIT/' + selectedRowData.item_Picture_05.slice(3)
    ]
    const [selectedImage, setSelectedImage] = useState(imageArray[0]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4433/RentIT/Controllers/getSessionValueController.php`, {
          withCredentials: true
        })
          .then(response => {
            const data = response.data;
            console.log(response.data);
            setDetails(data);
          });
      }, []);

    const handleAction = (action) => {
        axios.get('http://localhost:4433/RentIT/Controllers/showItemsController.php', {
            params: { status: action, id: selectedRowData.item_id, message: document.querySelector('.userMessageBox textarea').value, admin_NIC: details.NIC }
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.success) {
                    alert(`Item ${action}d successfully!`);  // Dynamic success message
                    onClose();  // Close the popup after successful action
                } else {
                    alert('Error: ' + response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
                alert('An error occurred. Please try again.');
            });
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/showItemsController.php', {
            params: { item_id: selectedRowData.item_id, category_id: selectedRowData.category_id , status: "5" }
        })
            .then((response) => {
                console.log('Category specific data : ', response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    

    const handleSubmit = () => {
        handleAction('approve');
    };

    const handleReject = () => {
        handleAction('reject');
    };

    let categorySpecificField;

    switch (selectedRowData.name) {
        case 'Real Estate':
            categorySpecificField =
                <>
                    <div>
                        <label>Number of Bedrooms:</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={data.bedrooms}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Number of Bathrooms:</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={data.bathrooms}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Square Footage:</label>
                        <input
                            type="number"
                            name="squareFootage"
                            value={data.square_footage}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Amenities:</label>
                        <div className="subcategoryContainer">
                            <input 
                                type="text"
                                value={data.amentities}
                                readOnly
                            />
                        </div>
                    </div>
                    <div>
                        <label>Furnishing Status:</label>
                        <div className="subcategoryContainer">
                            <input
                                type="text" 
                                value={data.furnishing_status}
                                readOnly
                            />
                        </div>
                    </div>
                    <div>
                        <label>Pet Policy:</label>
                        <div className="subcategoryContainer">
                            <input 
                                type="text" 
                                value={data.pet_policy}
                                readOnly
                            />
                        </div>
                    </div>
                </>
            break;
        case 'Vehicles':
            categorySpecificField =
                <>
                    <div>
                        <label>Make/Model:</label>
                        <input
                            type="text"
                            name="makeModel"
                            value={data.make_model}
                            readOnly
                             />
                    </div><div>
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={data.year}
                            readOnly
                             />
                    </div>
                    <div>
                        <label>Fuel Type:</label>
                        <input 
                            type="text"
                            name="fueltype" 
                            value={data.fuel_type}
                            readOnly
                        />
                    </div><div>
                        <label>Transmission Type:</label>
                        <input 
                            type="text"
                            name="fueltype" 
                            value={data.transmission_type}
                            readOnly
                        />
                    </div><div>
                        <label>Seating Capacity:</label>
                        <input
                            type="number"
                            name="seatingCapacity"
                            value={data.seating_capacity}
                            readOnly
                             />
                    </div><div>
                        <label>Insurance Included?</label>
                        <input
                            type="text"
                            name="insuranceIncluded"
                            value={data.insuarance_included === 1? 'Yes':'No'}
                            readOnly
                             />
                    </div></>
            break;
        case 'Electronics':
            categorySpecificField =
                <>
                    <div>
                        <label>Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={data.brand}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={data.model}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Technical Specifications:</label>
                        <input
                            type="text"
                            name="technicalSpecifications"
                            value={data.technical_specifications}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Accessories Included:</label>
                        <input 
                            type="text"
                            name="accessories" 
                            value={data.accessories}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Renting Method:</label>
                        <input 
                            type="text"
                            name="rentingmethod" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;
        case 'Tools & Equipment':
            categorySpecificField =
                <>
                    <div>
                        <label>Type of Tool/Equipment:</label>
                        <input
                            type="text"
                            name="toolType"
                            value={data.type}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Power Source:</label>
                        <input 
                            type="text"
                            name="powersource"  
                            value={data.power_source}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={data.brand}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={data.model}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Safety Instructions:</label>
                        <input
                            type="text"
                            name="safetyInstructions"
                            value={data.safety_instructions}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Renting Method:</label>
                        <input 
                            type="text"
                            name="fueltype" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;
        case 'Fashion & Accessories':
            categorySpecificField =
                <>
                    <div>
                        <label>Size:</label>
                        <input
                            type="text"
                            name="size"
                            value={data.size}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <div className="subcategoryContainer">
                            <input
                                type="text"
                                value={data.color}
                                readOnly
                            />

                        </div>
                    </div>
                    <div>
                        <label>Material:</label>
                        <input
                            type="text"
                            name="material"
                            value={data.material}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Designer/Brand:</label>
                        <input
                            type="text"
                            name="designerBrand"
                            value={data.designer_brand}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Occasion:</label>
                        <input 
                            type="text"
                            name="occasion" 
                            value={data.occasion}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Renting Method:</label>
                        <input 
                            type="text"
                            name="rentingmethod" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;
        case 'Sports & Outdoors':
            categorySpecificField =
                <>
                    <div>
                        <label>Type of Equipment:</label>
                        readOnly
                        <input
                            type="text"
                            name="equipmentType"
                            value={data.type}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={data.brand}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Size/Capacity:</label>
                        <input
                            type="text"
                            name="sizeCapacity"
                            value={data.size}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Weight Limit:</label>
                        <input
                            type="text"
                            name="weightLimit"
                            value={data.weight_limit}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Safety Instructions:</label>
                        <input
                            type="text"
                            name="safetyInstructions"
                            value={data.safety_instructions}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Renting method:</label>
                        <input 
                            type="text"
                            name="rentingmethod" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;
        case 'Event Supplies':
            categorySpecificField =
                <>
                    <div>
                        <label>Size/Dimensions:</label>
                        <input
                            type="text"
                            name="sizeDimensions"
                            value={data.size_dimensions}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Material:</label>
                        <input
                            type="text"
                            name="material"
                            value={data.material}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={data.capacity}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Setup Instructions:</label>
                        <input
                            type="text"
                            name="setupInstructions"
                            value={data.safety_instructions}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Renting method:</label>
                        <input 
                            type="text"
                            name="rentingmethod" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;
        case 'Books & Educational Material':
            categorySpecificField =
                <>
                    <div>
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={data.author}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Edition:</label>
                        <input
                            type="text"
                            name="edition"
                            value={data.edition}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>ISBN:</label>
                        <input
                            type="text"
                            name="isbn"
                            value={data.isbn}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Condition:</label>
                        <input
                            type="text"
                            name="condition"
                            value={data.item_condition}
                            readOnly
                            
                        />
                    </div>
                    <div>
                        <label>Subject/Topic:</label>
                        <div className="subcategoryContainer">
                            <input
                                type="text"
                                value={data.subject_topic}
                                readOnly
                            />
                        </div>
                    </div>
                    <div>
                        <label>Renting method:</label>
                        <input 
                            type="text"
                            name="rentingmethod" 
                            value={data.renting_method}
                            readOnly
                        />
                    </div>
                </>
            break;

    }


    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popupContentLeft">
                    <div className="popup-content-form">
                        <h3>Item Form</h3>
                        <div className="form-field">
                            <label>Item Title</label>
                            <input type="text" value={selectedRowData.title} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Description</label>
                            <textarea name="" id="" value={selectedRowData.description} readOnly></textarea>
                        </div>
                        <div className="form-field">
                            <label>Item District</label>
                            <input type="text" value={selectedRowData.district} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Address</label>
                            <textarea name="" id="" value={selectedRowData.location} readOnly></textarea>
                        </div>
                        <div className="price-preview form-field">
                            <label>Price Preview</label>
                            <table>
                                <thead>
                                    <tr>
                                        <th><label>Rental Durations</label></th>
                                        <th><label>Price</label></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <td>{selectedRowData.rental_duration}</td>
                                        <td>{selectedRowData.rental_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form-field">
                            <label>Item Condition</label>
                            <input type="text" value={selectedRowData.item_condition} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Category</label>
                            <input type="text" value={selectedRowData.name} readOnly />
                        </div>
                        <div className="form-field">
                            <label>Item Sub-Categories</label>
                            <input type="text" value={selectedRowData.subcategories} readOnly />
                        </div>

                        {categorySpecificField}

                    </div>

                </div>

                <div className="popupContentRight">
                    <div className="closeDiv">
                        <button className="btn close-btn" onClick={onClose}>Close</button>
                    </div>

                    {/* Image Slider */}
                    <h4>Item Images</h4>
                    <div className="itemApprovalPopupImageSlider">

                        <div className="image-thumbnails">
                            {imageArray.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.length > 28 ? (image) : (null)}
                                    className={`thumbnail-image ${selectedImage === image ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(image)} // Update selected image on click
                                />
                            ))}
                        </div>

                        <div className="selected-image">
                            <img src={selectedImage} alt="Selected" />
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn reject-btn" onClick={handleReject}>Reject</button>
                        <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
                    </div>

                    <div className="userMessageBox">
                        <textarea placeholder='Enter the message to notify the user'></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemApprovalPopupWindow;
