import React, { useState } from 'react'
import HeaderContent from '../HeaderContent/HeaderContent'
import AddItemForm from '../AddItemForm/AddItemForm'

import './AddItemPage.css'
import ItemCard from '../ItemCard/ItemCard'

function AddItemPage() {
    const [item, setItem] = useState({
        imageUrl: 'https://via.placeholder.com/250',
        name: '',
        category: '',
        subcategories: [],
        price: "0.00",
    });

    return (
        <>
            <HeaderContent/>

            <div className="addItemPageContainer">
                <div className="leftDivAddItemPage">
                    <AddItemForm item={item} setItem={setItem}/>
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
