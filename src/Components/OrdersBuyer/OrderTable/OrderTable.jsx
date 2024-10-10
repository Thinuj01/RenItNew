import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderTable.css';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderTable = ({ item }) => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4433/RentIT/Controllers/getItemReserveDetails.php', {
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

//   const handleRefund = () => {
//     axios.post('http://localhost:4433/RentIT/Controllers/refundPaymentController.php', {
//         order_id: "eve66f94b7b9",
//         refund_amount: 6000.00,
//     })
//     .then(response => {
//         console.log('Refund successful:', response.data);
//         alert('Refund processed successfully!');
//     })
//     .catch(error => {
//         console.error('Error processing refund:', error);
//         alert('Refund failed. Please try again.');
//     });
// };

const handleRefund = async (order_id) => {
  try {
      // Step 1: Send refund request to your PHP backend
      const refundResponse = await axios.post('http://localhost:4433/RentIT/Controllers/refundPaymentController.php', {
          order_id: order_id,  // Replace with actual order ID or payment ID 
          description: "Item is out of stock"
      });

      console.log('Refund response from backend:', refundResponse.data);
      if (refundResponse.data.status === 'success') {
          alert('Refund processed successfully!');
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
            <td><button className={`cancel-btn ${order.cancel}`} onClick={()=>{handleRefund(order.reserve_id)}}>Cancel</button></td>
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
