import React, { useRef, useState, useEffect } from 'react';
import './HorizontalScroller.css';
import ItemCard from '../ItemCard/ItemCard';

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

function HorizontalScroller(props) {
    const scrollerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollerRef.current.offsetLeft);
        setScrollLeft(scrollerRef.current.scrollLeft);
    };

    const onDragging = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed if necessary
        scrollerRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const scrollLeftArrow = () => {
        scrollerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightArrow = () => {
        scrollerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (scrollerRef.current) {
            setShowLeftArrow(scrollerRef.current.scrollLeft > 0);
            setShowRightArrow(
                scrollerRef.current.scrollWidth >
                scrollerRef.current.scrollLeft + scrollerRef.current.clientWidth
            );
        }
    };

    useEffect(() => {
        handleScroll(); // Set initial visibility of arrows
        window.addEventListener('resize', handleScroll); // Recheck arrows visibility on resize
        return () => window.removeEventListener('resize', handleScroll); // Clean up listener
    }, []);

    return (
        <>
            <div className="horizontalScrollerContainer">
                <div className="containerHead">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>

                <div className="scrollerWrapperHorizontal">
                    {showLeftArrow && (
                        <button className="arrow leftArrow" onClick={scrollLeftArrow}>
                            <RiArrowLeftSLine />
                        </button>
                    )}
                    <div
                        className="scrollerContainerHorizontal"
                        ref={scrollerRef}
                        onScroll={handleScroll}
                        onMouseDown={startDragging}
                        onMouseMove={onDragging}
                        onMouseUp={stopDragging}
                        onMouseLeave={stopDragging}
                    >
                        {props.children}


                    </div>
                    {showRightArrow && (
                        <button className="arrow rightArrow" onClick={scrollRightArrow}>
                            <RiArrowRightSLine />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default HorizontalScroller;
