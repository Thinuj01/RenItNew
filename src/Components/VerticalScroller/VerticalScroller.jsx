import React, { useRef, useState, useEffect } from 'react';
import './VerticalScroller.css';

import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";

function VerticalScroller(props) {
    const scrollerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [showTopArrow, setShowTopArrow] = useState(false);
    const [showBottomArrow, setShowBottomArrow] = useState(true);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartY(e.pageY - scrollerRef.current.offsetTop);
        setScrollTop(scrollerRef.current.scrollTop);
    };

    const onDragging = (e) => {
        if (!isDragging) return;
        const y = e.pageY - scrollerRef.current.offsetTop;
        const walk = (y - startY) * 2;
        scrollerRef.current.scrollTop = scrollTop - walk;
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const scrollTopArrow = () => {
        scrollerRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    };

    const scrollBottomArrow = () => {
        scrollerRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (scrollerRef.current) {
            setShowTopArrow(scrollerRef.current.scrollTop > 0);
            setShowBottomArrow(
                scrollerRef.current.scrollHeight >
                scrollerRef.current.scrollTop + scrollerRef.current.clientHeight
            );
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    return (
        <div className="verticalScrollerContainer">
            <div className="containerHead">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>

            <div className="scrollerWrapperVertical">
                {showTopArrow && (
                    <button className="arrow topArrow" onClick={scrollTopArrow}>
                        <RiArrowUpSLine />
                    </button>
                )}
                
                <div
                    className="scrollerContainerVertical"
                    ref={scrollerRef}
                    onScroll={handleScroll}
                    onMouseDown={startDragging}
                    onMouseMove={onDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                >
                    {props.children}
                </div>

                {showBottomArrow && (
                    <button className="arrow bottomArrow" onClick={scrollBottomArrow}>
                        <RiArrowDownSLine />
                    </button>
                )}
            </div>
        </div>
    );
}

export default VerticalScroller;
