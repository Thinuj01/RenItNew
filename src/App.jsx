import { useNavigate } from "react-router-dom";

import HeaderContent from "./Components/HeaderContent/HeaderContent";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import SubHeader from "./Components/SubHeader/SubHeader";
import SearchBar from "./Components/SearchBar/SearchBar";
import HorizontalScroller from "./Components/HorizontalScroller/HorizontalScroller";
import VerticalScroller from "./Components/VerticalScroller/VerticalScroller";
import CategoryBar from "./Components/CategoryBar/CategoryBar";

function App() {
  const navigate = useNavigate();
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  function logout() {
    setCookie("PHPSESSID", 0, -1);
    navigate("/");
    location.reload();
  }
  return (
    <>
      <HeaderContent />
      <SubHeader />
      <ImageSlider />
      <SearchBar />

      <HorizontalScroller
        title="Promotion Items"
        description="Also you can promote your items this section"
      />

      <CategoryBar />

      <HorizontalScroller
        title="Promotion Packages"
        description="Also you can promote your items package in this section"
      />

      <CategoryBar />

      <VerticalScroller title="Vertical Scroller" description="This is an Vertical Scroller for future works" />

      <button onClick={logout}>logout</button>
    </>
  );
}

export default App;
