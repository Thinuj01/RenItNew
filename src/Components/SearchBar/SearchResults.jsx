import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
    const location = useLocation();
    const { category, district, text } = location.state || {};

    return (
        <div>
            <h2>Search Results</h2>
            <p>Category: {category}</p>
            <p>District: {district}</p>
            <p>Search Text: {text}</p>
        </div>
    );
}

export default SearchResults;
