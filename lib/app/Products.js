import {BASE_URL, deleteJSON, getJSON, postJSON, putJSON} from ".";

const ProductAPI=  {
    postProduct(product) {
        return postJSON(`${BASE_URL}/products?`, {body: product})
    },

    getProducts() {
        return getJSON(`${BASE_URL}/products?`)
    },

    getProduct(id) {
        return getJSON(`${BASE_URL}/product/${id}?`)
    },  

    deleteProduct(id) {
        return deleteJSON(`${BASE_URL}/products/${id}?`)
    },

    updateProduct(product, id) {
        return putJSON(`${BASE_URL}/products/${id}?`, {body: product})
    }
};

export default ProductAPI;