import React, { useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import './ItemCard.css';
import { CiLocationOn } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ItemCard({ item , paths}) {
  const navigate = useNavigate();

  const category = ['Books & Educational Material','Electronics','Event Supplies','Fashion & Accessories','Real Estate','Sports & Outdoors','Tools & Equipment','Vehicles'];
  useEffect(()=>{
    // console.log(item);
  },[paths]);

  function addToWishlist(){
    // try{
      axios.get(`http://localhost:80/RentIT/Controllers/getSessionValueController.php`, {
        withCredentials: true
      })
        .then(response => {
          console.log(response.data);
          axios.get('http://localhost:80/RentIT/Controllers/wishlistDetailsController.php',{
            params:{status:"2",item_id:paths.item_id,nic:response.data.NIC}
          })
          .then(res=>{
            if(res.data == "Allready in Wishlist"){
              alert("Allready in WishList");
              return;
            }
            console.log(res.data);
          })
        });
    // }catch{
    //   alert("You need to SignIn first");
    // }

  }
  return (
    <>
      <div className="item-card"> 

        <div className="item-image" onClick={()=>{
        navigate("/ItemPreviewPage",{state:{id:paths.item_id}});
      }}>
          <img src={paths?'http://localhost:80/RentIT'+paths.item_Picture_01:item.imageUrl} alt={paths?paths.title:item.name} />
        </div>

        <div className="item-details">
          <h3 className="item-name">{paths?paths.title:item.name}</h3>
      
          <p className="item-category">{paths?category[paths.category_id-1]:item.category}</p>

          <div className="district_ratingValue">
      
            <div className="itemCardDistrict">
              <p><span><CiLocationOn /></span>{paths?paths.district:'Matara'}</p>
            </div>
      
            <div className="itemCardRatingSection">
              <div className="itemCardRatingStars">
                <span className="itemCardRatingStar green">&#9733;</span>
              </div>
              <span className="itemCardRatingScore">4.5</span><br />
            </div>
      
          </div>
      
          <p className="item-price">Rs.{paths?paths.rental_price+".00":item.price}</p>
        </div>
      
        <div className="wishlist-button">
          <button onClick={()=>{addToWishlist()}}>
            <CiHeart /> Add to Wishlist
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
