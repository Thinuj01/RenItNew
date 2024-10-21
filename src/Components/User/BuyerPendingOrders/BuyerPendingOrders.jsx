import React, { useEffect,useState } from 'react'
import './BuyerPendingOrders.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

export default function BuyerPendingOrders({buyer_nic}) {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:80/RentIT/Controllers/getItemReserveDetails.php',{
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

  const handleRefund = async (order_id) => {
    try {
        const refundResponse = await axios.post('http://localhost:80/RentIT/Controllers/refundPaymentController.php', {
            order_id: order_id, 
            description: "Item is out of stock"
        });
  
        console.log('Refund response from backend:', refundResponse.data);
        if (refundResponse.data.status == 1) {
            alert('Refund processed successfully!');
            axios.get('http://localhost:80/RentIT/Controllers/getItemReserveDetails.php',{
              params:{
                status:"4",
                reserve_id:order_id
              }
            })
            .then(response=>{
              console.log(response.data);
            })
            .catch(err=>{
              console.error(err);
            })
        } else {
            alert('Refund failed: ' + refundResponse.data.message);
        }
    } catch (error) {
        console.error('Error processing refund:', error);
        alert('Refund failed. Please try again.');
    }
  };
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
                <img src={'http://localhost:80/RentIT'+order.iPic} className='buyerpendingorder-pro-image'/>
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
          <td><button className={`cancel-btn ${order.cancel}`} onClick={()=>{handleRefund(order.reserve_id)}} disabled={order.onGoing == 1}>Cancel</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
