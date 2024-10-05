import React from 'react';
import './OrderTable.css';

const OrderTable = () => {
  const orders = [
    {
      name: 'Product 1',
      startDate: '2024/08/05',
      endDate: '2024/11/03',
      status: 'Active',
      track: 'green',
      cancel: 'red',
    },
    {
      name: 'Product 2',
      startDate: '2024/09/05',
      endDate: '2024/10/05',
      status: 'Active',
      track: 'green',
      cancel: 'red',
    },
    {
      name: 'Product 3',
      startDate: '2024/11/05',
      endDate: '2024/12/05',
      status: 'Pending',
      track: 'grey',
      cancel: 'red',
    },
  ];

  return (
    <table className="buyerorder-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Renting Start Date</th>
          <th>Renting End Date</th>
          <th>Order Status</th>
          <th>Track</th>
          <th>Cancel</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td><div className="buyertable-product-image"/></td>
            <td>{order.name}</td>
            <td>{order.startDate}</td>
            <td>{order.endDate}</td>
            <td className="status-column">
              <span className={`status-dot ${order.status === 'Active' ? 'green-dot' : 'grey-dot'}`}></span>
              {order.status}
            </td>
            <td><button className={`track-btn ${order.track}`}>Track</button></td>
            <td><button className={`cancel-btn ${order.cancel}`}>Cancel</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
