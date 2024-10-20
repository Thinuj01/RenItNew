import React, { useEffect, useState } from 'react';
import './PurchasePage.css'; // Include your CSS file for styling
import HeaderContent from './../HeaderContent/HeaderContent'
import SecureImg from '/SubHeaderImage/Image05.svg'
import logoB from '/logob.png'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';
import Footer from '../Footer/Footer';


const PurchasePage = () => {
    // State for delivery method
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const location = useLocation();
    const {fetch,selectedDates,cateData,details,userDetails} = location.state || [];
    const [itemUserDetails,setItemUserDetails] = useState([]);
    const [itemAddress, setItemAddress] = useState({});
    const [orderingID,setOrderingID] = useState("");
    const generateUniqueId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueId = 'R'; // Start with 'R'
    
        for (let i = 1; i < 10; i++) { // Generate the next 9 characters
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueId += characters[randomIndex];
        }
    
        return uniqueId;
    };

    useEffect(()=>{
        console.log("fetch",fetch);
        console.log("Dates",selectedDates);
        console.log("CateData",cateData);
        console.log("details",details);
        console.log("userDetails",userDetails[0]);

        setOrderingID(generateUniqueId());
        
    },[fetch,selectedDates]);

    useEffect(()=>{
        console.log(details);
        axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php?',{
            params:{status:"1",nic:fetch.NIC_number}
        })
        .then(response=>{
            setItemUserDetails(response.data);
        })
        .catch(error=>{
            console.error(error);
        })
      },[fetch]);

      
      useEffect(()=>{
        console.log(orderingID);
        console.log("Item User Details",itemUserDetails);
        setItemAddress({
            shopName: fetch.title,
            fullName: itemUserDetails.length>0?itemUserDetails[0].first_name+" "+itemUserDetails[0].last_name:"",
            address: itemUserDetails.length>0?itemUserDetails[0].permanent_address:"",
            district:  itemUserDetails.length>0?itemUserDetails[0].district:"",
            postalCode: itemUserDetails.length>0?itemUserDetails[0].postal_code:"",
            phone1: itemUserDetails.length>0?itemUserDetails[0].phone_number:"",
            phone2: '-',
        });
      },[itemUserDetails]);

    // State for address modal
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            fullName: userDetails[0].first_name+" "+userDetails[0].last_name,
            address: userDetails[0].permanent_address,
            district: details.district,
            postalCode: userDetails[0].postal_code,
            phone1: userDetails[0].phone_number,
            phone2: '-',
        }
    ]);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
    // State for item address (for pickup option)
    // const [itemAddress, setItemAddress] = useState({
    //     shopName: fetch.title,
    //     fullName: itemUserDetails.length>0?itemUserDetails[0].first_name:""+" "+itemUserDetails.length>0?itemUserDetails[0].last_name:"",
    //     address: itemUserDetails.length>0?itemUserDetails[0].permanent_address:"",
    //     district:  itemUserDetails.length>0?itemUserDetails[0].district:"",
    //     postalCode: itemUserDetails.length>0?itemUserDetails[0].postal_code:"",
    //     phone1: itemUserDetails.length>0?itemUserDetails[0].phone_number:"",
    //     phone2: '0721353148',

    //     // shopName: 'Backers',
    //     // fullName: 'itemUserDetails[0].first_name+" "+itemUserDetails[0].last_name',
    //     // address: 'itemUserDetails[0].permanent_address',
    //     // district:  'itemUserDetails[0].district',
    //     // postalCode: 'itemUserDetails[0].postal_code',
    //     // phone1: 'itemUserDetails[0].phone_number',
    //     // phone2: '0721353148',
    // });
    
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

    useEffect(() => {
        // Load the PayHere script when the component mounts
        const script = document.createElement('script');
        script.src = "https://www.payhere.lk/lib/payhere.js";
        script.async = true;
        script.onload = () => {
            window.payhere.onCompleted = function (orderId) {
                console.log("Payment completed. OrderID:" + orderId);
                axios.get('http://localhost:4433/RentIT/Controllers/paymentStatusController.php?',{
                    params:{
                        order_id:orderId,
                        item_id:fetch.item_id,
                        title:fetch.title,
                        user_nic:details.NIC,
                        user_fname:details.fname,
                        user_lname:userDetails[0].last_name,
                        pickup_Date:selectedDates[0],
                        return_Date:selectedDates[selectedDates.length-1],
                        item_fname:itemUserDetails.length>0?itemUserDetails[0].first_name:"",
                        item_lname:itemUserDetails.length>0?itemUserDetails[0].last_name:"",
                        item_mail:itemUserDetails.length>0?itemUserDetails[0].email_address:"",
                        status:"1",
                        user_mail:userDetails[0].email_address,
                    }
                }).then(response=>{
                    console.log(response.data);
                }).catch(error=>{
                    console.error(error);
                })
            };

            window.payhere.onDismissed = function () {
                console.log("Payment dismissed");
                axios.get('http://localhost:4433/RentIT/Controllers/paymentStatusController.php?',{
                    params:{
                        item_id:fetch.item_id,
                        title:fetch.title,
                        user_nic:details.NIC,
                        user_fname:details.fname,
                        user_lname:userDetails[0].last_name,
                        pickup_Date:selectedDates[0],
                        return_Date:selectedDates[selectedDates.length-1],
                        item_fname:itemUserDetails.length>0?itemUserDetails[0].first_name:"",
                        item_lname:itemUserDetails.length>0?itemUserDetails[0].last_name:"",
                        status:"2",
                        user_mail:userDetails[0].email_address,
                    }
                }).then(response=>{
                    console.log(response.data);
                }).catch(error=>{
                    console.error(error);
                })
            };

            window.payhere.onError = function (error) {
                console.log("Error:"  + error);
                // Handle payment error
            };
        };
        document.body.appendChild(script);

        // Clean up script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [itemUserDetails ]);

    const handlePayment = () => {
        // Fetch hash from backend using axios
        axios.get('http://localhost:4433/RentIT/Controllers/paymentController.php',{params:{
            order_id:orderingID,
            amount: deliveryMethod === 'shipping' ?(fetch.rental_price*selectedDates.length)+300:(fetch.rental_price*selectedDates.length)
            
        },withCredentials:true})
            .then(response => {
                const data = response.data;
                const payment = {
                    sandbox: true,
                    merchant_id: '1227928',    // Replace with your Merchant ID
                    return_url: 'http://localhost:4433/RentIT/Controllers/paymentReturnController.php', // URL to redirect users when success
                    cancel_url: 'http://yourdomain.com/cancel.php', // URL to redirect users when canceled
                    notify_url: 'http://localhost:4433/RentIT/Controllers/paymentNotifyController.php', // URL to callback the status of the payment
                    order_id: orderingID,
                    items: fetch.title,
                    amount: deliveryMethod === 'shipping' ?(fetch.rental_price*selectedDates.length)+300:(fetch.rental_price*selectedDates.length),
                    currency: 'LKR',
                    hash: data.hash, // Replace with generated hash retrieved from backend
                    first_name: userDetails[0].first_name,
                    last_name: userDetails[0].last_name,
                    email: userDetails[0].email_address,
                    phone: userDetails[0].phone_number,
                    address: userDetails[0].permanent_address,
                    city: userDetails[0].district,
                    country: 'Sri Lanka',
                    delivery_address: userDetails[0].permanent_address,
                    delivery_city: userDetails[0].district,
                    delivery_country: 'Sri Lanka'
                };

                if (window.payhere) {
                    window.payhere.startPayment(payment);
                }
            })
            .catch(error => console.error('Error fetching hash:', error));
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
                            {cateData.renting_method?(
                            <div>
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
                            ):(
                            <div className="active">Pickup</div>
                            )}
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
                        <p>Sub total: {fetch.rental_price*selectedDates.length}.00</p>
                        <p>Shipping fee: {deliveryMethod === 'shipping' ? '300.00' : '0.00'}</p>
                        <p><strong>Total: {deliveryMethod === 'shipping' ?(fetch.rental_price*selectedDates.length)+300:(fetch.rental_price*selectedDates.length)}.00</strong></p>
                        <div className="summary-section-buttons">
                            <button className="summary-section-button place-order-button" onClick={handlePayment}>Place Order</button>
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
            <Footer/>
        </div>
    );
};

export default PurchasePage;
