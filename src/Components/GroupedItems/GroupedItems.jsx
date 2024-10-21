import React, { useState } from 'react';
import './GroupedItems.css'
import NoneScroller from '../NoneScroller/NoneScroller';
import ItemCard from '../ItemCard/ItemCard';

const groupBy = (items, key) => {
    return items.reduce((result, item) => {
        if (key === 'All') {
            return { All: items };
        }

        const groupValue = key === 'Date'
            ? new Date(item.r_pickup_date).toLocaleString('default', { month: 'long', year: 'numeric' })
            : item.category;

        if (!result[groupValue]) {
            result[groupValue] = [];
        }

        result[groupValue].push(item);
        return result;
    }, {});
};

const hasPickupDate = (items) => {
    return items.some(item => item.r_pickup_date);
};

const GroupedItems = ({ items }) => {
    const [groupByKey, setGroupByKey] = useState('All');
    
    const handleGroupByChange = (e) => {
        setGroupByKey(e.target.value);
    };

    const modifiedItems = items.map(item => ({
        ...item,
        imageUrl: `http://localhost:4433/RentIT${item.imageUrl.slice(2)}`
    }));

    const groupedItems = groupBy(modifiedItems, groupByKey);
    const showDateOption = hasPickupDate(items);
    console.log(modifiedItems);

    return (
        <div>
            <div className='groupByButtonContainer'>
                <select value={groupByKey} onChange={handleGroupByChange}>
                    <option value="All">All</option>
                    {showDateOption && <option value="Date">Date</option>}
                    <option value="Category">Category</option>
                </select>
            </div>

            {Object.keys(groupedItems).map(group => (
                <div key={group}>
                    
                    <NoneScroller className='nonScrollerWrapperFourColumn' title={group}>
                    {groupedItems[group].map(item => (
                        
                        <div key={item.id}>
                            <ItemCard item={item}/>
                            {item.r_pickup_date && ` - ${new Date(item.r_pickup_date).toLocaleDateString()}`}
                        </div>
                        
                    ))}
                    </NoneScroller>
                </div>
            ))}
        </div>
    );
};

export default GroupedItems;
