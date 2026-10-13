
import axios from "axios";

const URL_BASE = "https://6ab2fc8c5b9b60f39d353034.mockapi.io";

export async function getUsers() {
    const response = await axios.get(`${URL_BASE}/users`);

    const usuarios = response.data;

    return usuarios;
}

export async function createUser(usuario) {
    const response = await axios.post(`${URL_BASE}/users`, usuario);

    return response.data;
}

export async function updateUser(id, usuario) {
    const response = await axios.put(`${URL_BASE}/users/${id}`, usuario);

    return response.data;
}

export async function deleteUser(id) {
    const response = await axios.delete(`${URL_BASE}/users/${id}`);

    return response.data;
}
