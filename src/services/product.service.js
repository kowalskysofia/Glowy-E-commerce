import axios from "axios";
const URL_BASE = "https://6ab2fc8c5b9b60f39d353034.mockapi.io";






export async function getproducts() {
    const response = await axios.get(`${URL_BASE}/products`);
    
    const productos = response.data;

    return productos;

}

export async function getProductById(id) {
    const response = await axios.get(`${URL_BASE}/products/${id}`);

    const producto = response.data;
    
    return producto;
}