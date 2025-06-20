import { act, useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import { GrAdd } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from 'next/link'

import ProductAPI from "@/lib/app/Products"

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core'
import Column from '../Column/Column'
import OrdersAPI from '@/lib/app/Orders'

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Products')
  const [total, setTotal] = useState(0)
  const [updateProducts, setUpdateProducts] = useState(false)

  const [products, setProducts] = useState([])

  const [orders, setOrders] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      const data = await ProductAPI.getProducts();
      setProducts(data)
    };

    getProducts();
    setUpdateProducts(false)
  }, [updateProducts]);

  useEffect(() => {
    const loadOrder = async () => {
      const ordersArray = await OrdersAPI.getOrders();
      setOrders(ordersArray);
      console.log(ordersArray)
    };

    loadOrder();
  }, []);

  const handleDragOver = (event) => {
    const { over } = event
  }
  const handleDragStart = (event) => {
    const { active } = event
    const activeOrderData = orders.find(order => order.OrderID === active.id)
    setActiveOrder(activeOrderData)

    const totalRaw = activeOrderData.Products.reduce((sum, product) => {
      return sum + parseFloat(product.Price) * 1;
    }, 0);

    setTotal(totalRaw)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveOrder(null);

    if (!over) return;

    const activeOrderId = active.id;

    const overContainerId = over.id;

    const activeOrder = orders.find(order => order.OrderID === activeOrderId);
    if (!activeOrder) return;

    let newState;
    if (
      overContainerId === 'payment-column' || 
      (over.data?.current?.type === 'column' && over.data.current.state === 'P')
    ) {
      newState = 'P';
    } else if (
      overContainerId === 'delivery-column' || 
      (over.data?.current?.type === 'column' && over.data.current.state === 'D')
    ) {
      newState = 'D';
    } else if (
      overContainerId === 'completed-column' || 
      (over.data?.current?.type === 'column' && over.data.current.state === 'C')
    ) {
      newState = 'C';
    } else {
      const overOrder = orders.find(order => order.OrderID === over.id);
      if (overOrder) {
        newState = overOrder.State;
      } else {
        return;
      }
    }

    if (activeOrder.State !== newState) {
      
      const res = await OrdersAPI.updateState(newState, activeOrderId)

      const freshOrders = await OrdersAPI.getOrders();
      setOrders(freshOrders);
    }
  };

  const handleDelete = async (id) => {
    await ProductAPI.deleteProduct(id);
    setUpdateProducts(true);
  }

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
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
                    <p>{activeOrder.Address}</p>
                    <p>{activeOrder.PLZ}</p>
                    <p>{activeOrder.Village}</p>
                    <p>{activeOrder.City}</p>
                  </div>
                  <div className={styles.userInf}>
                      <p>{activeOrder.FirstName}</p>
                      <p>{activeOrder.Name}</p>
                      <h4>{activeOrder.orderPrice} CHF</h4>
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