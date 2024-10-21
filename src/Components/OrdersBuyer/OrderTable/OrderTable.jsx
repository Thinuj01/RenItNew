import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderTable.css';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderTable = ({ item }) => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:80/RentIT/Controllers/getItemReserveDetails.php', {
      params: {
        status: "2",
        item_id: item.item_id
      }
    })
      .then(response => {
        setOrder(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [item]);

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
    <table className="buyerorder-table">
      <thead>
        <tr>
          <th>NIC Number</th>
          <th>Buyer Name</th>
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
            <td>{order.NIC_number}</td>
            <td>{order.buyer_fname} {order.buyer_lname}</td>
            <td>{new Date(order.pickup_date).toLocaleDateString()}</td>
            <td>{new Date(order.return_date).toLocaleDateString()}</td>
            <td className="status-column">
              <span className={`status-dot ${order.onGoing === 1 ? 'green-dot' : 'grey-dot'}`}></span>
              {order.onGoing === 1 ? "OnGoing" : "Pending"}
            </td>
            <td>
              <button
                className={`track-btn ${order.track}`}
                onClick={() => navigate("/SellerTrackingPage", { state: { reserve_id: order.reserve_id } })}
              >
                Track
              </button>
            </td>
            <td><button className={`cancel-btn ${order.cancel}`} onClick={()=>{handleRefund(order.reserve_id)}} disabled={order.onGoing == 1}>Cancel</button></td>
          </tr>
        ))}
      </tbody>
      {/* <button onClick={handleRefund} className="refund-button">
            Process Refund
        </button> */}
    </table>
  );
};

export default OrderTable;
