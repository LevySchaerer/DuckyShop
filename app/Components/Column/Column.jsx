import Order from '../Order/Order'
import styles from './Column.module.css'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function Column({ orders, title }) {
    return (
        <div className={styles.column}>
            <h1>{title}</h1>
            <SortableContext items={orders.map((order) => order.OrderID)} strategy={verticalListSortingStrategy}>
                {orders.map((order) => {
                    return (
                        <Order id={order.OrderID} state={order.State} key={order.OrderID}/>
                    )
                })
                }
            </SortableContext>
        </div>
    )
}