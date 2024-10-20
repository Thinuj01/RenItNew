import React, { useEffect, useState } from 'react';
import './ItemPreviewPage.css';
import ToggleableSection from '../ToggleableSection/ToggleableSection';
import ItemImageSlider from '../ItemImageSlider/ItemImageSlider';
import FeedBackShowingBox from '../FeedBackShowingBox/FeedBackShowingBox';
import HorizontalScroller from '../HorizontalScroller/HorizontalScroller';
import VerticalScroller from '../VerticalScroller/VerticalScroller';
import HeaderContent from '../HeaderContent/HeaderContent';
import IitemPreviewPageItemDetails from '../IitemPreviewPageItemDetails/IitemPreviewPageItemDetails';
import ItemPreviewPageDateSelectCalendar from '../ItemPreviewPageDateSelectCalendar/ItemPreviewPageDateSelectCalendar';
import NoneScroller from '../NoneScroller/NoneScroller';
import ItemCard from '../ItemCard/ItemCard';
import { json, useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer';

function ItemPreviewPage() {
    const location = useLocation();
    const { id } = location.state || {};
    const [fetch, setFetch] = useState([]);
    const [cateData, setCateData] = useState([]);
    const [details, setDetails] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [pricingModifiers, setPricingModifiers] = useState([]);

    const item = {
        imageUrl: 'https://via.placeholder.com/250',
        name: 'Sample Item name in 2 lines visible',
        category: 'Electronics',
        subcategories: ['Smartphones', 'Accessories', 'Gadgets'],
        price: 99.99
    };
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4433/RentIT/Controllers/showItemsController.php?`, {
                params: { status: "2", id: id }
            })
                .then(response => {
                    console.log('Response data:', response.data);
                    setFetch(response.data);
                    
                    // Parse pricing_modifiers from the fetched data
                    const item = response.data[0];
                    if (item.pricing_modifiers) {
                        const parsedModifiers = JSON.parse(item.pricing_modifiers);
                        setPricingModifiers(parsedModifiers);
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setFetch([]);
                });
        }
    }, [id]);

    useEffect(() => {
        const item = fetch.length > 0 ? fetch[0] : {};
        const cate = item.category_id;
        axios.get(`http://localhost:4433/RentIT/Controllers/showItemsController.php?`,{
            params: {status:"3",cate_id:cate}
        }).then(response => {
            console.log("Cate Data",response.data);
            response.data.forEach(res=>{
                if(res.item_id == id){
                    setCateData(res);
                }
            })
        })
    }, [fetch]);

    useEffect(() => {
        axios.get('http://localhost:4433/RentIT/Controllers/getSessionValueController.php',{withCredentials:true})
        .then(response=>{
            setDetails(response.data);
        }).catch(error=>{
            console.error(error);
        })
      },[id]);

    useEffect(()=>{
        details?
        axios.get('http://localhost:4433/RentIT/Controllers/getUserDetailsController.php?',{
            params:{status:"1",nic:details['NIC']}
        })
        .then(response=>{
            setUserDetails(response.data);
        })
        .catch(error=>{
            console.error(error);
        }):null;
      },[details]);

    return (
        <>
            <HeaderContent />
            <div className="ItemPreviewPageContainer">
                <div className="itemPreviewPageContainerTop">
                    <div className="ItemPreviewPageContainerleftDiv">
                        <div className="itemImageSlider">
                            <ItemImageSlider
                                pics={fetch.length > 0 && fetch[0].pics ? fetch[0].pics : []}
                            />
                        </div>
                        <div className="itemDescription">
                            <p>{fetch.length > 0 && fetch[0].description?fetch[0].description:""}</p>
                            {/* {cateData && cateData.length > 0 ? (
                                cateData.map((item, index) => (
                                    <div key={index}>
                                        {Object.keys(item).map((key, i) => (
                                            <p key={i}>
                                                <strong>{key}: </strong>{item[key]}
                                            </p>
                                        ))}
                                    </div>
                                ))
                            ) : 'No category data available'} */}


                        </div>
                        <div className="FeedbackShowingBox">
                            <FeedBackShowingBox fetch={fetch} />
                        </div>
                        <div className="promotionSimilarItemsDiv">
                            <NoneScroller
                                title='Promotion Similar Items'
                                description='Also you can promote your items this section'
                                className='nonScrollerWrapperThreeColumn'
                            >
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                                <ItemCard item={item} />
                            </NoneScroller>
                        </div>
                    </div>

                    <div className="ItemPreviewPageContainerrightDiv">
                        <div className="itemPreviewPageItemDetailsDiv">
                            <IitemPreviewPageItemDetails fetch={fetch} />
                        </div>

                        <div className="itemPriceList_itemPreviewPageDateSelectCalendarDiv">
                            <div className="itemPriceList">
                                <div className="price-preview">
                                    <h3>Price Preview:</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Rental Duration (Days)</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pricingModifiers.length > 0 ? (
                                                pricingModifiers.map((modifier, index) => (
                                                    <tr key={index}>
                                                        <td>{modifier.days || 'N/A'}</td>
                                                        <td>{modifier?"Rs."+fetch[0].rental_price*modifier.days*modifier.multiplier+".00":null|| 'N/A'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2">No pricing modifiers available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="itemPreviewPageDateSelectCalendarDiv">
                                <ItemPreviewPageDateSelectCalendar fetch={fetch} cateData={cateData} details={details} userDetails={userDetails} />
                            </div>
                        </div>

                        <div className="moreDetailsOfItem">
                            <div className="shippingMethod">
                                <ToggleableSection title="Shipping Method:">
                                    <p><strong>Seller-Managed:</strong> The seller handles the shipping process for both delivery and return.</p>
                                    <p><strong>Cost Responsibility:</strong> Shipping costs may be covered by either the buyer or the seller, depending on the seller’s policy. Specific details can be found on the item page.</p>
                                    <p><strong>Delivery Options:</strong> Sellers may offer various shipping options, including 24-hour delivery windows.</p>
                                </ToggleableSection>
                            </div>

                            <div className="codeSystem">
                                <ToggleableSection title="Code System for Rental Items:">
                                    <p><strong>Payment Confirmation:</strong> After completing a payment, you’ll receive a unique code from the system. This code is essential for both receiving and returning the item.</p>
                                    <p><strong>Receiving the Itembility:</strong> When receiving the item—either via shipping or pickup—you must provide this code to the seller, who will confirm it in the system.</p>
                                    <p><strong>Returning the Item:</strong> At the end of your rental period, you’ll receive a new code for returning the item. Provide this code to the seller, who will confirm the return in the system.</p>
                                    <p><strong>24-Hour Window:</strong> The sending and receiving of the item must be completed within 24 hours to ensure smooth and timely transactions.</p>
                                </ToggleableSection>
                            </div>

                            <div className="shppingMethod">
                                <ToggleableSection title="Shipping Method:">
                                    <p><strong>Seller-Managed: </strong> The seller handles the shipping process for both delivery an d return.</p>
                                    <p><strong>Cost Responsibility::</strong> Shipping costs may be covered by either the buyer or the seller, depending on the seller’s policy. Specific details can be found on the item page.</p>
                                    <p><strong>Delivery Options:</strong> Sellers may offer various shipping options, including 24-hour delivery windows.</p>
                                </ToggleableSection>
                            </div>

                            <div className="pickupMethod">
                                <ToggleableSection title="Pickup Option:">
                                    <p><strong>In-Store Pickup:</strong> Collect your rented item directly from the seller’s shop, bringing the unique code sent by the system for verification.</p>
                                    <p><strong>Item Return:</strong> Return the item to the shop within the rental period and provide the return code to the seller for confirmation.</p>
                                    <p><strong>Accountability:</strong> Failure to return the item on time can result in negative feedback, affecting your account quality.</p>
                                </ToggleableSection>
                            </div>

                            <div className="feedbackFunction">
                                <ToggleableSection title="Feedback Function:">
                                    <p><strong>Mutual Feedback:</strong> Both buyers and sellers can leave feedback for each other. This feedback can be either positive or negative, depending on the experience.</p>
                                    <p><strong>Impact on Accounts:</strong> Negative feedback can affect the account quality of both parties. For example, a buyer who fails to return an item on time may receive negative feedback, while a seller who provides poor service might also receive a negative rating.</p>
                                    <p><strong>Maintaining Standards:</strong> This mutual feedback system encourages both buyers and sellers to maintain high standards of responsibility, reliability, and service.</p>
                                </ToggleableSection>
                            </div>

                            <div className="paymentOptions">
                                <ToggleableSection title="Payment Option:">
                                    <p><strong>:</strong> </p>
                                    <p><strong>:</strong> </p>
                                    <p><strong>:</strong> </p>
                                </ToggleableSection>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="itemPreviewPageContainerBottom">
                    <HorizontalScroller title='Promotion Similar Items' description='Also you can promote your items this section'>
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                    </HorizontalScroller>


                    <VerticalScroller title='Promotion Similar Items' description='Also you can promote your items this section'>
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                    </VerticalScroller>

                    <HorizontalScroller title='Promotion Similar Items' description='Also you can promote your items this section'>
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                        <ItemCard item={item} />
                    </HorizontalScroller>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ItemPreviewPage;
