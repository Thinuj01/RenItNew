import React, { useRef, useState, useEffect } from 'react';
import HeaderContent from "./Components/HeaderContent/HeaderContent";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import SubHeader from "./Components/SubHeader/SubHeader";
import SearchBar from "./Components/SearchBar/SearchBar";
import HorizontalScroller from "./Components/HorizontalScroller/HorizontalScroller";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import './index.css';
import ItemCard from "./Components/ItemCard/ItemCard";
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
            const response = await axios.get('http://localhost:80/RentIT/Controllers/showItemsController.php', {
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
  
  return (
    <>
      <HeaderContent categoryBarRef={categoryBarRef} />
      <SubHeader />
      <ImageSlider />
      <SearchBar onSearch={handleSearch} />

      <div className="containerHomePage">
        <HorizontalScroller title="Promotion Items" description="Also you can promote your items this section">
        {Array.isArray(paths) && paths.length > 0 ? (
        paths.map((image, index) => (
          <ItemCard key={index} item={item} paths={image} navi="preview"/>
        ))
        ) : (
            <div>No items found</div>
        )}
        </HorizontalScroller>

        <CategoryBar ref={categoryBarRef} />
      </div>
    </>
  );
}

export default App;
