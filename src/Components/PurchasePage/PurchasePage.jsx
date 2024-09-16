import React, { useEffect, useState } from 'react';
import './PurchasePage.css'; // Include your CSS file for styling
import HeaderContent from './../HeaderContent/HeaderContent'
import SecureImg from '/SubHeaderImage/Image05.svg'
import logoB from '/logob.png'
import { useLocation,useNavigate } from 'react-router-dom'


const PurchasePage = () => {
    // State for delivery method
    const [deliveryMethod, setDeliveryMethod] = useState('shipping');
    const location = useLocation();
    const {fetch,selectedDates,cateData,details,userDetails} = location.state || [];

    useEffect(()=>{
        console.log("fetch",fetch);
        console.log("Dates",selectedDates);
        console.log("CateData",cateData);
        console.log("details",details);
        console.log("userDetails",userDetails[0]);
    },[fetch,selectedDates]);

    // State for address modal
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            fullName: 'Ravindu Dilshan Karunathilaka',
            address: '83/A, Lewduwa, Meetiyagoda.',
            district: 'Galle District',
            postalCode: '80320',
            phone1: '0764052661',
            phone2: '0721353148',
        }
    ]);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    // State for item address (for pickup option)
    const [itemAddress, setItemAddress] = useState({
        shopName: 'Bakers',
        fullName: 'Thiunuja Hettiarachchi',
        address: 'Thelijjavilla, Weligama.',
        district: 'Mathara District',
        postalCode: '80320',
        phone1: '0764052661',
        phone2: '0721353148',
    });

    // State for card modal
    const [showNewCardModal, setShowNewCardModal] = useState(false);
    const [cards, setCards] = useState([
        {
            cardHolderName: 'Ravindu Dilshan Karunathilaka',
            cardNumber: '1234 5678 1234 5678',
            expiry: '12 / 24',
            cvv: '001'
        }
    ]);
    const [selectedCard, setSelectedCard] = useState(cards[0]);

    // Function to handle adding a new address
    const handleAddAddress = (newAddress) => {
        setAddresses([...addresses, newAddress]);
        setSelectedAddress(newAddress); // Automatically select the new address
        setShowNewAddressModal(false); // Close the modal
    };

    // Function to handle adding a new card
    const handleAddCard = (newCard) => {
        setCards([...cards, newCard]);
        setSelectedCard(newCard); // Automatically select the new card
        setShowNewCardModal(false); // Close the modal
    };

    return (
        <div className="purchasePageContainer">
            <HeaderContent />

            <div className="purchase-page">
                <div className="purchasePageContainerLeft">
                    {/* Delivery Method Section */}
                    <div className="delivery-method">
                        <span>Choose your delivery method</span>
                        <div className="delivery-method-buttons">
                            <button
                                className={deliveryMethod === 'shipping' ? 'active' : ''}
                                onClick={() => setDeliveryMethod('shipping')}
                            >
                                Shipping
                            </button>
                            <button
                                className={deliveryMethod === 'pickup' ? 'active' : ''}
                                onClick={() => setDeliveryMethod('pickup')}
                            >
                                Pickup Option
                            </button>
                        </div>
                        <p>{deliveryMethod === 'shipping' ?
                            'In the Galle District free shipping, but others can be added with an additional fee.' :
                            'In this option, you must get your item after reaching the address below.'}
                        </p>
                    </div>

                    {/* Conditional Rendering of Address Sections */}
                    {deliveryMethod === 'shipping' ? (
                        <div className="address-section">
                            <span>Shipping Address {selectedAddress.fullName ? '(Selected)' : ''}</span>
                            {addresses.map((address, index) => (
                                <div
                                    key={index}
                                    className={`address-card ${selectedAddress === address ? 'selected' : ''}`}
                                    onClick={() => setSelectedAddress(address)}
                                >
                                    <p><strong>{address.fullName}</strong></p>
                                    <p>{address.address}</p>
                                    <p>{address.district} - {address.postalCode}</p>
                                    <p>{address.phone1} / {address.phone2}</p>
                                </div>
                            ))}
                            <button className="add-new-button" onClick={() => setShowNewAddressModal(true)}>Add New Address</button>
                        </div>
                    ) : (
                        <div className="item-address-section">
                            <span>Item Address</span>
                            <div className="item-address-card">
                                <p><strong>{itemAddress.shopName}</strong></p>
                                <p>{itemAddress.fullName}</p>
                                <p>{itemAddress.address}</p>
                                <p>{itemAddress.district} - {itemAddress.postalCode}</p>
                                <p>{itemAddress.phone1} / {itemAddress.phone2}</p>
                            </div>
                        </div>
                    )}

                    {/* Card Section */}
                    <div className="card-section">
                        <span>Card Details {selectedCard.cardHolderName ? '(Selected)' : ''}</span>
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`card-card ${selectedCard === card ? 'selected' : ''}`}
                                onClick={() => setSelectedCard(card)}
                            >
                                <p><strong>{card.cardHolderName}</strong></p>
                                <p>{card.cardNumber}</p>
                                <p>{card.expiry} | CVV: {card.cvv}</p>
                            </div>
                        ))}
                        <button className="add-new-button" onClick={() => setShowNewCardModal(true)}>Add New Card</button>
                    </div>
                </div>

                <div className="purchasePageContainerRight">
                    {/* Summary Section */}
                    <div className="summary-section">
                        <h3>Summary</h3>
                        <p>Sub total: 2000.00</p>
                        <p>Shipping fee: {deliveryMethod === 'shipping' ? '300.00' : '0.00'}</p>
                        <p><strong>Total: {deliveryMethod === 'shipping' ? '2300.00' : '2000.00'}</strong></p>
                        <div className="summary-section-buttons">
                            <button className="summary-section-button place-order-button">Place Order</button>
                            <button className="summary-section-button cancel-order-button">Cancel Order</button>
                        </div>
                    </div>

                    {/* Trusting Label */}
                    <div className="PurchasePageTrustLabel">
                        <img src={logoB} alt="" />
                        <div className="secureText">
                            <img src={SecureImg} alt="" />
                            <p>Rentit keeps your information and payment safe</p>
                        </div>
                    </div>
                </div>

                {/* New Address Modal */}
                {showNewAddressModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Add New Address</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const newAddress = {
                                    fullName: e.target.fullName.value,
                                    address: e.target.address.value,
                                    district: e.target.district.value,
                                    postalCode: e.target.postalCode.value,
                                    phone1: e.target.phone1.value,
                                    phone2: e.target.phone2.value,
                                };
                                handleAddAddress(newAddress);
                            }}>
                                <label>Full Name</label>
                                <input name="fullName" type="text" required />
                                <label>Address</label>
                                <input name="address" type="text" required />
                                <label>District</label>
                                <select name="district" required>
                                    <option value="Galle District">Galle District</option>
                                    <option value="Colombo District">Colombo District</option>
                                    <option value="Kandy District">Kandy District</option>
                                    {/* Add more districts here */}
                                </select>
                                <label>Postal Code</label>
                                <input name="postalCode" type="text" required />
                                <label>Phone 1</label>
                                <input name="phone1" type="text" required />
                                <label>Phone 2</label>
                                <input name="phone2" type="text" required />
                                <button type="submit">Add Address</button>
                            </form>
                            <button onClick={() => setShowNewAddressModal(false)}>Close</button>
                        </div>
                    </div>
                )}

                {/* New Card Modal */}
                {showNewCardModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Add New Card</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const newCard = {
                                    cardHolderName: e.target.cardHolderName.value,
                                    cardNumber: e.target.cardNumber.value,
                                    expiry: e.target.expiry.value,
                                    cvv: e.target.cvv.value,
                                };
                                handleAddCard(newCard);
                            }}>
                                <label>Card Holder Name</label>
                                <input name="cardHolderName" type="text" required />
                                <label>Card Number</label>
                                <input name="cardNumber" type="text" required />
                                <label>Expiry</label>
                                <input name="expiry" type="text" placeholder="MM / YY" required />
                                <label>CVV</label>
                                <input name="cvv" type="text" required />
                                <button type="submit">Add Card</button>
                            </form>
                            <button onClick={() => setShowNewCardModal(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchasePage;
