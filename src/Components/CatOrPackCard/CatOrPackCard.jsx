import React from 'react'
import './CatOrPackCard.css'
import { Link } from 'react-router-dom'

function CatOrPackCard(props) {
    return (
        <>
            <Link style={{"text-decoration" : "none"}} to={props.url}>
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
