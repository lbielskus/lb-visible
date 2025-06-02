import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Order {
  _id: string;
  paid: boolean;
  email: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (session && session.user && session.user.email) {
          const email = session.user.email;
          const res = await axios.get<Order[]>(
            `/api/user-orders?email=${email}`
          );
          setOrders(res.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [session]);

  return (
    <div>
      <h1>All Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order ID: {order._id}, Paid: {order.paid ? 'Yes' : 'No'}, Email:{' '}
              {order.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
