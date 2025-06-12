import styles from './Order.module.css'

import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

export default function Order({id, state}) {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={styles.order}>
            <h3>{id}</h3>
            <h3>{state}</h3>
        </div>
    )
}