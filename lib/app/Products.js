import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from ".";

const ProductAPI=  {
    postProduct(product) {
        return postJSON(`${BASE_URL}/product`, {body: product})
    },

    getProduct() {
        return getJSON(`${BASE_URL}/products`,)
    }
};

export default ProductAPI;