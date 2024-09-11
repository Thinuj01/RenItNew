import React, { useState } from "react";
import './ItemImageSlider.css';

const ItemImageSlider = () => {
    const images = [
        "https://www.gstatic.com/webp/gallery/1.jpg",
        "https://via.placeholder.com/600x400?text=Image+2",
        "https://via.placeholder.com/600x400?text=Image+3",
        "https://via.placeholder.com/600x400?text=Image+4",
        "https://via.placeholder.com/600x400?text=Image+5",
    ];

    const [currentImage, setCurrentImage] = useState(images[0]);
    const [magnifierStyle, setMagnifierStyle] = useState({
        backgroundImage: '',
        backgroundPosition: '0% 0%',
        display: 'none',
    });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        setMagnifierStyle({
            backgroundImage: `url(${currentImage})`,
            backgroundSize: `${width * 2}px ${height * 2}px`,  // Adjust zoom level by changing multiplier
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            display: 'block',
            top: `${y - 75}px`,  // Move the magnifier
            left: `${x - 75}px`
        });
    };

    const handleMouseLeave = () => {
        setMagnifierStyle((prevStyle) => ({ ...prevStyle, display: 'none' }));
    };

    return (
        <div className="item-image-slider-container">
            <div className="small-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`small-${index}`}
                        className={`small-image ${currentImage === image ? 'active' : ''}`}
                        onClick={() => setCurrentImage(image)}
                    />
                ))}
            </div>

            <div className="large-image" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <img src={currentImage} alt="large-view" />
                <div className="magnifier" style={magnifierStyle}></div>
            </div>
        </div>
    );
};

export default ItemImageSlider;
