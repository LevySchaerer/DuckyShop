import styles from './Order.module.css'

import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

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

export default function Order({id, state, order}) {

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id,
        data: {
            type: 'order',
            order: order
        }
    })

    const total = order.Products.reduce((sum, product) => {
        return sum + product.Price * product.Quantity;
    }, 0);

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
            className={styles.order}>

            <div className={styles.adressInf}>
                <p>{users[order.UserID - 1].Address}</p>
                <p>{users[order.UserID - 1].PLZ}</p>
                <p>{users[order.UserID - 1].City}</p>
            </div>
            <div className={styles.userInf}>
                <p>{users[order.UserID - 1].FirstName}</p>
                <p>{users[order.UserID - 1].Name}</p>
                <h4>{total}</h4>
            </div>
        </div>
    )
}