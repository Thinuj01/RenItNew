import React from 'react'
import './ItemPreviewPage.css'
import ToggleableSection from '../ToggleableSection/ToggleableSection'
import ItemImageSlider from '../ItemImageSlider/ItemImageSlider'
import FeedBackShowingBox from '../FeedBackShowingBox/FeedBackShowingBox'
import HorizontalScroller from '../HorizontalScroller/HorizontalScroller'
import HeaderContent from '../HeaderContent/HeaderContent'
import IitemPreviewPageItemDetails from '../IitemPreviewPageItemDetails/IitemPreviewPageItemDetails'
import ItemPreviewPageDateSelectCalendar from '../ItemPreviewPageDateSelectCalendar/ItemPreviewPageDateSelectCalendar'
import NoneScroller from '../NoneScroller/NoneScroller'
import ItemCard from '../ItemCard/ItemCard'

function ItemPreviewPage() {
    const item = {
        imageUrl: 'https://via.placeholder.com/250',
        name: 'Sample Item name in 2 lines visible',
        category: 'Electronics',
        subcategories: ['Smartphones', 'Accessories', 'Gadgets'], // Add subcategories here
        price: 99.99
    };

    return (
        <>
            <HeaderContent />
            <div className="ItemPreviewPageContainer">


                <div className="ItemPreviewPageContainerleftDiv">
                    <div className="itemImageSlider">
                        <ItemImageSlider />
                    </div>
                    <div className="FeedbackShowingBox">
                        <FeedBackShowingBox />
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
                        </NoneScroller>
                    </div>

                    <HorizontalScroller
                        title='Promotion Similar Items'
                        description='Also you can promote your items this section'
                    />
                    <HorizontalScroller
                        title='Similar Package'
                        description='Also you can promote your items this section'
                    />
                    <HorizontalScroller
                        title='Similar Items'
                        description='Also you can promote your items this section'
                    />
                </div>

                <div className="ItemPreviewPageContainerrightDiv">
                    <div className="itemPreviewPageItemDetailsDiv">
                        <IitemPreviewPageItemDetails />
                    </div>

                    <div className="itemPreviewPageDateSelectCalendarDiv">
                        <ItemPreviewPageDateSelectCalendar />
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
        </>
    )
}

export default ItemPreviewPage
