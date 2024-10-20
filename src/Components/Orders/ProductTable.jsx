import React from 'react';
import './ProductTable.css';

const ProductTable = () => {
  const orders = [
    {
      orderid: 'Order 1', 
      name: 'Product 1',
      location: 'Galle',
      startDate: '2024/08/05',
      endDate: '2024/11/03',
      status: 'Ongoing',
      track: 'green',
      cancel: 'red',
    },
    {
      orderid: 'Order 2',
      name: 'Product 2',
      location: 'Unawatuna',
      startDate: '2024/09/05',
      endDate: '2024/10/05',
      status: 'Ongoing',
      track: 'green',
      cancel: 'red',
    },
    {
      orderid: 'Order 3',
      name: 'Product 3',
      location: 'Matara',
      startDate: '2024/11/05',
      endDate: '2024/12/05',
      status: 'Pending',
      track: 'grey',
      cancel: 'red',
    },
  ];

  return (
    <div>
      <table className="sellerorder-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Location</th>
            <th>Renting Start Date</th>
            <th>Renting End Date</th>
            <th>Order Status</th>
            <th>Track</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderid}</td>
              <td>{order.name}</td>
              <td>{order.location}</td>
              <td>{order.startDate}</td>
              <td>{order.endDate}</td>
              <td className="status-column">
                <span className={`status-dot ${order.status === 'Ongoing' ? 'green-dot' : 'grey-dot'}`}></span>
                {order.status}
              </td>
              <td><button className={`track-btn ${order.track}`}>Track</button></td>
              <td><button className={`cancel-btn ${order.cancel}`}>Decline</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
