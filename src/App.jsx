import { useNavigate } from 'react-router-dom'

import HeaderContent from "./Components/HeaderContent/HeaderContent"
import ImageSlider from "./Components/ImageSlider/ImageSlider"
import SubHeader from "./Components/SubHeader/SubHeader"

function App() {
  const navigate = useNavigate();
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  function logout() {
    setCookie('PHPSESSID', 0, -1);
    navigate('/');
    location.reload();
  }
  return (
    <>
      <HeaderContent/>
      <SubHeader/>

      <ImageSlider/>

      <button onClick={logout}>logout</button>

    </>
  )
}

export default App
