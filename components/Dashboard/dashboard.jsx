import { useState } from 'react'
import styles from './dashboard.module.css'
import sha256 from 'crypto-js/sha256'
import ducky from '../../public/RubberDucky.jpg'
import Image from 'next/image'

import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core'
import Column from '../Column/Column'

const token = '9d01b00876449148347bf4c01395553173fcaa479db1925b706974c1b06f7126'

const products = [
  {
    id: 1,
    name: "Ducky Mr Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  },
  {
    id: 2,
    name: "Ducky Dr Max",
    price: 2.99,
    image: ducky,
    stock: 1
  },
  {
    id: 3,
    name: "Ducky Mrs Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  },
  {
    id: 4,
    name: "Mrs Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  }
];

const ordersArray = [
  {
    OrderID: "1",
    UserID: "1",
    Products: [
      { ProductID: "1", Name: "Laptop", Price: 999.99, Quantity: 1 },
      { ProductID: "2", Name: "Mouse", Price: 29.99, Quantity: 2 }
    ],
    OrderDate: "2025-06-11",
    State: "D"
  },
  {
    OrderID: "2",
    UserID: "2",
    Products: [
      { ProductID: "3", Name: "Keyboard", Price: 59.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-10",
    State: "D"
  },
  {
    OrderID: "3",
    UserID: "3",
    Products: [
      { ProductID: "4", Name: "Monitor", Price: 199.99, Quantity: 1 },
      { ProductID: "5", Name: "Headphones", Price: 79.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-09",
    State: "C"
  },
  {
    OrderID: "4",
    UserID: "1",
    Products: [
      { ProductID: "6", Name: "Webcam", Price: 89.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-08",
    State: "D"
  },
  {
    OrderID: "5",
    UserID: "4",
    Products: [
      { ProductID: "7", Name: "Speaker", Price: 149.99, Quantity: 2 }
    ],
    OrderDate: "2025-06-07",
    State: "P"
  },
  {
    OrderID: "6",
    UserID: "5",
    Products: [
      { ProductID: "8", Name: "Tablet", Price: 299.99, Quantity: 1 },
      { ProductID: "9", Name: "Stylus", Price: 49.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-06",
    State: "C"
  },
  {
    OrderID: "7",
    UserID: "2",
    Products: [
      { ProductID: "10", Name: "Mouse Pad", Price: 19.99, Quantity: 3 }
    ],
    OrderDate: "2025-06-05",
    State: "D"
  },
  {
    OrderID: "8",
    UserID: "3",
    Products: [
      { ProductID: "11", Name: "External Drive", Price: 129.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-04",
    State: "P"
  },
  {
    OrderID: "9",
    UserID: "4",
    Products: [
      { ProductID: "12", Name: "USB Hub", Price: 39.99, Quantity: 2 },
      { ProductID: "13", Name: "Cable", Price: 9.99, Quantity: 4 }
    ],
    OrderDate: "2025-06-03",
    State: "C"
  },
  {
    OrderID: "10",
    UserID: "5",
    Products: [
      { ProductID: "14", Name: "Printer", Price: 249.99, Quantity: 1 }
    ],
    OrderDate: "2025-06-02",
    State: "P"
  }
];

export default function Dashboard() {
  const [auth, setAuth] = useState(true)
  const [err, setErr] = useState('')
  const [password, setPassword] = useState('')
  const [selectedTab, setSelectedTab] = useState('Products')

  const [orders, setOrders] = useState(ordersArray)
  const [activeOrder, setActiveOrder] = useState(null)

  const authCheck = () => {
    if (sha256(password).toString() === token) {
      setAuth(true)
    } else {
      setErr("Wrong Password")
    }
  }

  // Handle drag over event for better visual feedback
  const handleDragOver = (event) => {
    const { over } = event
    // This helps maintain consistent hover state
  }
  const handleDragStart = (event) => {
    const { active } = event
    const activeOrderData = orders.find(order => order.OrderID === active.id)
    setActiveOrder(activeOrderData)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    setActiveOrder(null)

    if (!over) return

    const activeOrderId = active.id
    const overContainerId = over.id

    const activeOrder = orders.find(order => order.OrderID === activeOrderId)
    if (!activeOrder) return

    let newState
    if (overContainerId === 'payment-column' || over.data?.current?.type === 'column' && over.data.current.state === 'P') {
      newState = 'P'
    } else if (overContainerId === 'delivery-column' || over.data?.current?.type === 'column' && over.data.current.state === 'D') {
      newState = 'D'
    } else if (overContainerId === 'completed-column' || over.data?.current?.type === 'column' && over.data.current.state === 'C') {
      newState = 'C'
    } else {
      const overOrder = orders.find(order => order.OrderID === over.id)
      if (overOrder) {
        newState = overOrder.State
      } else {
        return
      }
    }

    if (activeOrder.State !== newState) {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.OrderID === activeOrderId 
            ? { ...order, State: newState }
            : order
        )
      )
    }
    console.log(orders)
  }

  if (!auth) {
    return (
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <input onChange={(e) => setPassword(e.target.value)} placeholder='Token' type="password" />
        <button onClick={authCheck} className={styles.button}>Submit</button>
        <h4>{err}</h4>
      </div>
    )
  }

  return (
    <div className={styles.body}>
      <div className={styles.topSelector}>
        <button className={`${styles.selectorButton} ${selectedTab === 'Products' ? styles.active : ''}`} onClick={() => setSelectedTab('Products')}>Products</button>
        <button className={`${styles.selectorButton} ${selectedTab === 'Orders' ? styles.active : ''}`} onClick={() => setSelectedTab('Orders')}>Orders</button>
      </div>

      <div className={styles.content}>
        {selectedTab === 'Products' && (
          <div className={styles.products}>
            {products.map((product, i) => (
              <div key={i} className={styles.product}>
                <div className={styles.productContent}>
                  <div><Image src={product.image} className={styles.duckyImage} alt={product.name} /></div>
                  <div>
                    <h3>{product.name}</h3>
                    <h3>{product.price}</h3>
                  </div>
                </div>
                <div className={styles.productEdit}>
                  <FaRegEdit className={styles.editIcons} size={20} />
                  <FaRegTrashCan className={styles.editIcons} color='#b81d1d' size={20} />
                </div>
              </div>
            ))

            }
          </div>
        )}
        {selectedTab === 'Orders' && (
          <DndContext 
            collisionDetection={closestCorners} 
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className={styles.columns}>
              <Column 
                id="payment-column"
                orders={orders.filter(order => order.State === 'P')} 
                title={"Payment"}
                state="P"
              />
              <Column 
                id="delivery-column"
                orders={orders.filter(order => order.State === 'D')} 
                title={"Delivery"}
                state="D"
              />
              <Column 
                id="completed-column"
                orders={orders.filter(order => order.State === 'C')} 
                title={"Completed"}
                state="C"
              />
            </div>
            <DragOverlay>
              {activeOrder ? (
                <div className={styles.dragOverlay}>
                  <h3>{activeOrder.OrderID}</h3>
                  <p>State {activeOrder.State}</p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  )
}