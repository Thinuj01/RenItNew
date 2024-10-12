import React, { useEffect,useState } from 'react'
import './BuyerPendingOrders.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

export default function BuyerPendingOrders({buyer_nic}) {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:4433/RentIT/Controllers/getItemReserveDetails.php',{
            params:{
                status:"3",
                buyer_nic:buyer_nic
            }
        })
        .then(response=>{
            console.log(response.data);
            setOrder(response.data);
        })
        .catch(err=>{
            console.error(err);
        })
    },[buyer_nic]);

  const sortedOrders = order.sort((a, b) => {
    if (a.onGoing !== b.onGoing) {
      return b.onGoing - a.onGoing;
    }
    return new Date(a.pickup_date) - new Date(b.pickup_date);
  });
  return (
    <table className="buyerpendingorder-table">
    <thead>
      <tr>
        <th>Product Image</th>
        <th>Item</th>
        <th>Renting Start Date</th>
        <th>Renting End Date</th>
        <th>Order Status</th>
        <th>Track</th>
        <th>Cancel</th>
      </tr>
    </thead>
    <tbody>
      {sortedOrders.map((order, index) => (
        <tr key={index}>
          <td><div className='buyerpendingorder-product-image'>
                <img src={'http://localhost:4433/RentIT'+order.iPic} className='buyerpendingorder-pro-image'/>
            </div></td>
          <td>{order.title}</td>
          <td>{new Date(order.pickup_date).toLocaleDateString()}</td>
          <td>{new Date(order.return_date).toLocaleDateString()}</td>
          <td className="status-column">
            <span className={`status-dot ${order.onGoing === 1 ? 'green-dot' : 'grey-dot'}`}></span>
            {order.onGoing === 1 ? "OnGoing" : "Pending"}
          </td>
          <td>
            <button
              className={`track-btn ${order.track}`}
              onClick={() => navigate("/BuyerTrackingPage", { state: { reserve_id: order.reserve_id } })}
            >
              Track
            </button>
          </td>
          <td><button className={`cancel-btn ${order.cancel}`}>Cancel</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
