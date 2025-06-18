import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from ".";

const ProductAPI=  {
    postProduct(product) {
        return postJSON(`${BASE_URL}/product`, {body: product})
    },

    getProducts() {
        return getJSON(`${BASE_URL}/products`)
    },

    getProduct(id) {
        return getJSON(`${BASE_URL}/product/${id}`)
    },  

    deleteProduct(id) {
        return deleteJSON(`${BASE_URL}/product/${id}`)
    },

    updateProduct(product, id) {
        return putJSON(`${BASE_URL}/product/${id}`, {body: product})
    }
};

export default ProductAPI;