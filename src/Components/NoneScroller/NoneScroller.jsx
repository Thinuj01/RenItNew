import React from 'react';
import './NoneScroller.css';

function NoneScroller(props) {
    return (
        <div className="noneScrollerContainer">
            <div className="containerHead">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>

            <div className="nonScrollerWrapperContainer">
                <div className={`nonScrollerWrapper ${props.className}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default NoneScroller;
