import React from 'react'
import './CatOrPackCard.css'
import { Link } from 'react-router-dom'

function CatOrPackCard(props) {
    return (
        <>
            <Link 
            style={{ textDecoration: 'none' }} 
            to={{
                pathname: props.url,  // This is just the base URL without the query
                search: `?category=${encodeURIComponent(props.category)}`,  // Query parameters go here
                state: { title: props.title }
            }}
        >
            <div className="CatOrPackCardContainer">
                <div className="CatOrPackCardImage">
                    <img src={props.imageSrc} alt={props.imageAlt} />
                </div>

                <div className="CatOrPackCardTitle">
                    <h4>{props.title}</h4>
                </div>
            </div>
        </Link>
        </>
    )
}

export default CatOrPackCard
