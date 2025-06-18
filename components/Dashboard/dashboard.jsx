import { act, useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import sha256 from 'crypto-js/sha256'
import ducky from '../../public/RubberDucky.jpg'
import Image from 'next/image'
import { GrAdd } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from 'next/link'

import ProductAPI from "@/lib/app/Products"

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core'
import Column from '../Column/Column'

const token = '32ebb1abcc1c601ceb9c4e3c4faba0caa5b85bb98c4f1e6612c40faa528a91c9'

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

const users = [
  {
    UserID: "1",
    FirstName: "Max",
    Name: "Imal",
    Address: "Zürichstrasse 72",
    PLZ: "3012",
    City: "Zürich"
  },
  {
    UserID: "2",
    FirstName: "Anna",
    Name: "Muster",
    Address: "Bahnhofstrasse 10",
    PLZ: "8001",
    City: "Zürich"
  },
  {
    UserID: "3",
    FirstName: "Luca",
    Name: "Schmidt",
    Address: "Postgasse 5",
    PLZ: "3000",
    City: "Bern"
  },
  {
    UserID: "4",
    FirstName: "Sara",
    Name: "Meier",
    Address: "Limmatquai 3",
    PLZ: "8001",
    City: "Zürich"
  },
  {
    UserID: "5",
    FirstName: "Jonas",
    Name: "Huber",
    Address: "Hauptstrasse 45",
    PLZ: "4051",
    City: "Basel"
  }
];

export default function Dashboard() {
  const [auth, setAuth] = useState(false)
  const [err, setErr] = useState('')
  const [password, setPassword] = useState('')
  const [selectedTab, setSelectedTab] = useState('Products')
  const [total, setTotal] = useState(0)
  const [updateProducts, setUpdateProducts] = useState(false)

  const [products, setProducts] = useState()

  const [orders, setOrders] = useState(ordersArray)
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      const data = await ProductAPI.getProducts();
      setProducts(data)
    };

    getProducts();
    setUpdateProducts(false)
  }, [updateProducts]);

  const authCheck = () => {
    if (sha256(password).toString() === token) {
      setAuth(true)
    } else {
      setErr("Wrong Password")
    }
  }

  const handleDragOver = (event) => {
    const { over } = event
  }
  const handleDragStart = (event) => {
    const { active } = event
    const activeOrderData = orders.find(order => order.OrderID === active.id)
    setActiveOrder(activeOrderData)

    const totalRaw = activeOrderData.Products.reduce((sum, product) => {
      return sum + product.Price * product.Quantity;
    }, 0);

    setTotal(totalRaw)
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
  }

  const handleDelete = async (id) => {
    await ProductAPI.deleteProduct(id);
    setUpdateProducts(true);
  }

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  }

  if (!auth) {
    return (
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Token' type="password" />
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
            <Link href={"/create"} className={styles.addProduct}>
              <GrAdd size={70} color='#3b82f6' />
            </Link>
            {products.map((product, i) => {
              const image = product.Image;
              console.log(i, ". ImageSrc: ", image)

              return (
                <div key={i} className={styles.product}>
                  <div className={styles.productContent}>
                    <div><img src={image} className={styles.duckyImage} alt={product.Name} /></div>
                    <div>
                      <h3>{product.Name}</h3>
                      <h3>{product.Price}</h3>
                    </div>
                  </div>
                  <div className={styles.productEdit}>
                    <FaRegEdit onClick={() => handleEdit(product.ProductID)} className={styles.editIcons} size={20} />
                    <FaRegTrashCan onClick={() => handleDelete(product.ProductID)} className={styles.editIcons} color='#b81d1d' size={20} />
                  </div>
                </div>
              )
            })

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
                  <div className={styles.adressInf}>
                    <p>{users[activeOrder.UserID - 1].Address}</p>
                    <p>{users[activeOrder.UserID - 1].PLZ}</p>
                    <p>{users[activeOrder.UserID - 1].City}</p>
                  </div>
                  <div className={styles.userInf}>
                    <p>{users[activeOrder.UserID - 1].FirstName}</p>
                    <p>{users[activeOrder.UserID - 1].Name}</p>
                    <h4>{total}</h4>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  )
}