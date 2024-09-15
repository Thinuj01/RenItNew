import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';
import sliderData from './sliderData.json';
import { Link } from 'react-router-dom';

function ImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);

    // Function to start the automatic slide transition
    const startSlideInterval = () => {
        slideInterval.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
        }, 5000); // 5 seconds
    };

    // Function to reset the slide interval when manually changing the slide
    const resetSlideInterval = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        startSlideInterval();
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
        resetSlideInterval(); // Reset the timer after manual change
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderData.length) % sliderData.length);
        resetSlideInterval(); // Reset the timer after manual change
    };

    const selectSlide = (index) => {
        setCurrentSlide(index);
        resetSlideInterval(); // Reset the timer after manual change
    };

    useEffect(() => {
        startSlideInterval(); // Start the interval when component mounts

        return () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current); // Clear interval on unmount
            }
        };
    }, []);

    return (
        <div className="sliderPaddingContaion">
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {sliderData.map((slide, index) => (
                        <div
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            key={index}
                        >
                            <div className="slide-content">
                                <div className="sliderColor"></div>
                                <div className="slide-content-description slide-text-overlay">
                                    <div>
                                        <h1>{slide.title}</h1>
                                        <h1 className="onOurSite">{slide.description}</h1>
                                    </div>
                                    <div className="slide-content-link">
                                        <Link to={slide.buttonLink} className="btn">
                                            {slide.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <img src={slide.image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <div className="slider-controls">
                    <button className="prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="next" onClick={nextSlide}>
                        &#10095;
                    </button>
                </div>
                <div className="slider-indicators">
                    {sliderData.map((_, index) => (
                        <span
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            key={index}
                            onClick={() => selectSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;
