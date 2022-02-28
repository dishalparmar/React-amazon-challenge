import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from '../Firebase';
import { useStateValue } from '../State/StateProvider';
import Order from './Order';

function Orders() {

const [orders, setOrders] = useState([]);
const [{user}, dispatch] = useStateValue();

useEffect(() => {
    if(user) {
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot(snapshot => (
              setOrders(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
              })))
          ))
    } else {
        setOrders([]);
    }

}, [user]);

  return (
    <div className='orders'>
      <h1>Your Order(s)</h1>
          {orders?.map(order => (
              <Order order={order} />
          ))}
    </div>
  )
}

export default Orders