import { BASE_URL, deleteJSON, getJSON, postJSON, putJSON } from '.';

const OrdersAPI = {
	postOrder(order) {
		return postJSON(`${BASE_URL}/order`, { body: order });
	},

	getOrders() {
		return getJSON(`${BASE_URL}/orders`);
	},

	updateState(state, id) {
		return putJSON(`${BASE_URL}/order/${id}`, { body: { state } });
	},
};

export default OrdersAPI;
