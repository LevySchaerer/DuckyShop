import styles from './Order.module.css'

import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

export default function Order({id, state, order}) {

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id,
        data: {
            type: 'order',
            order: order
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    return (
        <div 
            ref={setNodeRef} 
            {...attributes} 
            {...listeners} 
            style={style} 
            className={styles.order}
        >
            <h3>{id}</h3>
            <p>State {state}</p>
        </div>
    )
}