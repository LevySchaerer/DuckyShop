import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from ".";

const OrdersAPI=  {
    postOrder(order) {
        return postJSON(`http://localhost:3001/order`, {body: order})
    },
    
    getOrders() {
        return getJSON(`http://localhost:3001/orders`)
    },

    updateState(state, id) {
        return putJSON(`http://localhost:3001/order/${id}`, {body: state})
    }
};

export default OrdersAPI;