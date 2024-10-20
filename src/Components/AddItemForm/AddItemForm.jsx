import React, { useState , useEffect} from 'react';
import axios from 'axios';
import CommonFields from './CommonFields';
import ImageUpload from './ImageUpload';
import RentalPriceForm from './RentalPriceForm';
import ConditionField from './ConditionField';
import CategoryFields from './CategoryFields';
import CategorySpecificFields from './CategorySpecificFields';
import { useNavigate } from 'react-router-dom';
import './AddItemForm.css';

function AddItemForm({ item, setItem }) {
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
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(selectedSubcategories != null){
            setItem({
                ...item,
                subcategories:selectedSubcategories,
            });
        }
    }, [selectedSubcategories]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if(e.target.name=="title"){
            setItem({
                ...item,
                name:e.target.value,
            }); 
        }
        if(e.target.name=="basePricePerDay"){
            setItem({
                ...item,
                price:e.target.value,
            }); 
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setItem({
            ...item,
            category:e.target.value,
        }); 
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => {
            const newImages = [...prevImages, ...files].slice(0, 5); // Limiting to 5 images
            if (newImages.length > 0 && item.imageUrl === 'https://via.placeholder.com/250') {
                // Update the item imageUrl with the first image's URL
                setItem({
                    ...item,
                    imageUrl: URL.createObjectURL(newImages[0]),
                });
            }
            return newImages;
        });
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleBasePriceChange = (e) => {
        setBasePricePerDay(e.target.value);
        setItem({
            ...item,
            price:e.target.value,
        }); 
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

        return formData.basePricePerDay * days * multiplier;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = {
            ...formData,
            images,
            pricingModifiers,
            category,
            selectedSubcategories,
            selectedDistrict,
        };
        console.log(step);
        console.log('Form Data:', formDataToSubmit);
        try {
            const response = await axios.post('http://localhost:4433/RentIT/Controllers/addItemController.php', formDataToSubmit,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });
            console.log('Item adding successful:', response.data);
            window.alert('Your item submitted successfully');
            navigate('/');
            
        } catch (error) {
            console.error('Error during registration:', error);
        }
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
                            setFormData={handleInputChange}
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
                    formData={formData}
                    setFormData={handleInputChange}
                />;
            case 3:
                return (
                    <div>
                        <ConditionField
                            formData={formData}
                            setFormData={handleInputChange}
                        />
                        <CategoryFields
                            category={category}
                            handleCategoryChange={handleCategoryChange}
                            onInputChange={handleInputChange}
                            setSelectedSubcategories={setSelectedSubcategories}
                            selectedSubcategories={selectedSubcategories}
                        />
                    </div>
                );
            case 4:
                return <CategorySpecificFields
                    category={category}
                    handleInputChange={handleInputChange}
                    formData={formData}
                    setFormData={setFormData}
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
                            // <button type="submit" className="submit-btn">Submit</button>
                            <input type="submit" value="Submit" className="submit-btn"/>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemForm;
