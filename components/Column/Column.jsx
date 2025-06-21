import Order from '../Order/Order';
import styles from './Column.module.css';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

export default function Column({ id, orders, title, state }) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
		data: {
			type: 'column',
			state: state,
			accepts: ['order'],
		},
	});

	return (
		<div
			ref={setNodeRef}
			className={`${styles.column} ${isOver ? styles.columnOver : ''}`}
			style={{
				minHeight: '300px',
				transition: 'all 0.2s ease',
			}}
		>
			<h1>{title}</h1>
			<SortableContext
				items={orders.map((order) => order.OrderID)}
				strategy={verticalListSortingStrategy}
			>
				{orders.map((order) => {
					return (
						<Order
							id={order.OrderID}
							state={order.State}
							key={order.OrderID}
							order={order}
						/>
					);
				})}
			</SortableContext>
		</div>
	);
}
