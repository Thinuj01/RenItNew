import React from 'react'
import HeaderContent from '../HeaderContent/HeaderContent'
import AddItemForm from '../AddItemForm/AddItemForm'

import './AddItemPage.css'
import ItemCard from '../ItemCard/ItemCard'

function AddItemPage() {

    const item = {
        imageUrl: 'https://via.placeholder.com/250',
        name: 'Sample Item name in 2 lines visible' ,
        category: 'Electronics',
        subcategories: ['Smartphones', 'Accessories', 'Gadgets'], // Add subcategories here
        price: 99.99
      };

    return (
        <>
            <HeaderContent/>


            <div className="addItemPageContainer">
                <div className="leftDivAddItemPage">
                    <AddItemForm/>
                </div>

                <div className="rightDivAddItemPage">
                    <div className='itemPreview'>
                    <ItemCard item={item} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItemPage
