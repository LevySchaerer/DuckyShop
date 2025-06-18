import styles from './Order.module.css'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function Order({ id, state, order }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id,
        data: {
            type: 'order',
            order: order
        }
    })

    const total = order.Products.reduce((sum, product) => {
        return sum + parseFloat(product.Price);
    }, 0)

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={styles.order}
        >
            <div className={styles.adressInf}>
                <p>{order.Address}</p>
                <p>{order.PLZ}</p>
                <p>{order.Village}</p>
                <p>{order.City}</p>
            </div>
            <div className={styles.userInf}>
                <p>{order.FirstName}</p>
                <p>{order.Name}</p>
                <h4>{order.orderPrice} CHF</h4>
            </div>
        </div>
    )
}
