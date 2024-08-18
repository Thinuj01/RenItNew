import React from 'react'
import './SubHeader.css'
import SubHeaderData from './SubHeaderData.json'

function SubHeader() {
    return (
        <>
            <div className="subHeaderContainer">
                <div className="subHederTopic">
                    <h2>A Smar Way</h2>
                    <h2>to Rent</h2>
                </div>

                <div className="subHeaderCards">
                    {SubHeaderData.map((item, index) => (
                        <div key={index} className="subHeaderCard">
                            <img src={item.icon} alt={item.title} className="subHeaderIcon" />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SubHeader
