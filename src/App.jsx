import React, { useRef, useState, useEffect } from 'react';
import HeaderContent from "./Components/HeaderContent/HeaderContent";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import SubHeader from "./Components/SubHeader/SubHeader";
import SearchBar from "./Components/SearchBar/SearchBar";
import HorizontalScroller from "./Components/HorizontalScroller/HorizontalScroller";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import './index.css';
import ItemCard from "./Components/ItemCard/ItemCard";
import Footer from "./Components/Footer/Footer";
import axios from 'axios';

function App() {
  const [searchParams, setSearchParams] = useState({
    category: '',
    district: '',
    text: ''
  });

  const categoryBarRef = useRef(null); // Create a ref for the CategoryBar

  const handleSearch = (category, district, text) => {
    setSearchParams({ category, district, text });
  };

  const item = {
    imageUrl: 'https://via.placeholder.com/250',
    name: 'Sample Item name in 2 lines visible',
    category: 'Electronics',
    subcategories: ['Smartphones', 'Accessories', 'Gadgets'],
    price: 99.99
  };

  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4433/RentIT/Controllers/showItemsController.php', {
                params: { param: 'all', status: "1" },
                withCredentials:true
            });
            setPaths(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchRatings = async () => {
      const updatedPaths = await Promise.all(
        paths.map(async (path) => {
          try {
            const response = await axios.get('http://localhost:80/RentIT/Controllers/feedbackController.php', {
              params: { itemId: path.item_id, status: "3" },
              withCredentials: true
            });
            return { ...path, rating: response.data };
          } catch (error) {
            console.error('There was an error fetching rating', error);
            return path;
          }
        })
      );
      setPaths(updatedPaths);
    };
  
    if (paths.length > 0) {
      fetchRatings();
    }
  }, [paths]);
  
  const getRandomItems = (items, count) => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, count);
  };

  const randomItems = getRandomItems(paths, 6);


  return (
    <>
      <HeaderContent categoryBarRef={categoryBarRef} />
      <SubHeader />
      <ImageSlider />
      <SearchBar onSearch={handleSearch} />

      <div className="containerHomePage">
        <HorizontalScroller title="Things may you like..." description="" >
          {Array.isArray(randomItems) && randomItems.length > 0 ? (
            randomItems.map((image, index) => (
              <ItemCard key={index} item={item} paths={image} navi="preview"/>
            ))
          ) : (
            <div>No items found</div>
          )}
        </HorizontalScroller>

        <CategoryBar ref={categoryBarRef} />
        
      </div>
      <Footer />
    </>
  );
}

export default App;
