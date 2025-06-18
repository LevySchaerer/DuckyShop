import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from ".";

const OrdersAPI=  {
    postOrder(order) {
        return postJSON(`${BASE_URL}/order`, {body: order})
    }
};

export default OrdersAPI;