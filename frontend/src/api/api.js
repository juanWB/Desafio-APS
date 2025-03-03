import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getClients = () => api.get('/');
export const createClient = (client) => api.post('/cliente', client);
export const updateClient = (cnpj, client) => api.put(`/cliente/${cnpj}`, client);
export const deleteClient = (cnpj) => api.delete(`/${cnpj}`);

export default api;
