import React, { useState } from 'react';
import './GroupedItems.css'

const groupBy = (items, key) => {
    return items.reduce((result, item) => {
        if (key === 'All') {
            return { All: items };
        }

        const groupValue = key === 'Date'
            ? new Date(item.date).toLocaleString('default', { month: 'long', year: 'numeric' })
            : item.category;

        if (!result[groupValue]) {
            result[groupValue] = [];
        }

        result[groupValue].push(item);
        return result;
    }, {});
};

const GroupedItems = ({ items }) => {
    const [groupByKey, setGroupByKey] = useState('All');

    const handleGroupByChange = (e) => {
        setGroupByKey(e.target.value);
    };

    const groupedItems = groupBy(items, groupByKey);

    return (
        <div>
            <div className='groupByButtonContainer'>
                <select value={groupByKey} onChange={handleGroupByChange}>
                    <option value="All">All</option>
                    <option value="Date">Date</option>
                    <option value="Category">Category</option>
                </select>
            </div>

            {Object.keys(groupedItems).map(group => (
                <div key={group}>
                    <h3>{group}</h3>
                    <ul>
                        {groupedItems[group].map(item => (
                            <li key={item.id}>{item.name} - {new Date(item.date).toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GroupedItems;
